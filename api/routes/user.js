import express from 'express';
const router = express.Router();
import { cloneDeep } from 'lodash';

import { 
  encryptPassword, 
  verifyPassword,
  makeToken, 
  verifyAccessToken,
} from '../utils/auth';

import { Users } from '../models';

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});

/**
 * 회원가입
 */
router.post('/sign-up', upload.single('image'), async (req, res) => {
  const rt = {
    ok: false,
    msg: '',
    result: null
  }
  try {
    const file = req.file;
    const params = JSON.parse(req.body.info);
    const data = {
      email: params.email,
      password: encryptPassword(params.password),
      name: params.name,
      nickName: params.nickName,
      image: file === undefined ? null : file.buffer.toString('base64'),
      desc: params.desc || ''
    }
    await Users.create(data);

    rt.ok = true;
    rt.msg = 'ok';
  } catch (err) {
    console.error('sign-up Error : ', err);
    rt.msg = err.message;
    rt.result = err;
  }
  res.send(rt);
})

/**
 * 로그인
 */
router.post('/sign-in', async (req, res) => {
  const rt = {
    ok: false,
    msg: '',
    result: null
  }
  const failMsg = '이메일 또는 비밀번호를 확인해주시기 바랍니다.';
  try {
    const params = req.body;
    // 사용자 정보 가져오기
    const findUser = await Users.findOne({email: params.email});
    if (!findUser || findUser.length === 0) throw { message: failMsg};

    const user = cloneDeep(findUser);
    
    // 패스워드 일치하는지 검증
    const passVerify = verifyPassword(params.password, user.password);
    if (!passVerify) throw { message : failMsg };

    const { access, refresh } = makeToken(user, true, true);
    // 사용자 정보에 refresh Token 추가
    await Users.update({email: user.email}, {token: refresh});

    const rtUser = user.toObject();
    delete rtUser.password;
    delete rtUser.token;

    rt.ok = true;
    rt.msg = 'ok';
    rt.result = { 
      rtUser,
      token : {
        access, 
        refresh,
      }
    };
  } catch (err) {
    console.error('sign-in Error : ', err);
    rt.msg = err.message;
    rt.result = err;
  }
  res.send(rt);
});

/**
 * 토큰 검증 후 사용자 정보 전달
 */
router.post('/getUser', async (req, res) => {
  const rt = {
    ok: false,
    msg: '',
    result: null
  }
  try {
    const token = await verifyAccessToken(req.headers['access-token']);
    const user = await Users.findOne({email: token.email});
    
    const rtUser = user.toObject();
    delete rtUser.password;
    delete rtUser.token;

    rt.ok = true;
    rt.msg = 'ok';
    rt.result = rtUser;

  } catch (err) {
    console.error('/user/getUser Error : ', err);
    rt.msg = err.message;
    rt.result = err;
  }
  res.send(rt);
})

module.exports = router;