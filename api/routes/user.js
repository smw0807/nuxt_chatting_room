import express from 'express';
const router = express.Router();

import { 
  encryptPassword, 
  verifyPassword,
  makeToken, 
} from '../utils/auth';

import { Users } from '../models';

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});

router.post('/test', async (req, res) => {
  try {
    const rs = await Users.find({});
    console.log(rs);
  } catch (err) {
    console.error(err);
  }
  res.send({ok: true, msg: 'ok'});
})

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
    const rs = await Users.create(data);
    //rs에 저장된 정보 그대로 나옴
    // console.log('result : ', rs);
    rt.ok = true;
    rt.msg = 'ok';
  } catch (err) {
    console.error('sign-up Error : ', err);
    rt.msg = err.message;
    rt.result = err;
  }
  res.send(rt);
})

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
    const findUser = await Users.find({email: params.email});
    if (findUser.length === 0) throw { message: failMsg};

    const user = findUser[0];

    // 패스워드 일치하는지 검증
    const passVerify = verifyPassword(params.password, user.password);
    if (!passVerify) throw { message : failMsg };

    const { access, refresh } = makeToken(user, true, true);
    await Users.update({email: user.email}, {token: refresh});

    delete Object.getPrototypeOf(user).password;
    console.log(user);
    // rt.ok = true;
    rt.msg = 'ok';
    rt.result = { 
      user,
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
})

module.exports = router;