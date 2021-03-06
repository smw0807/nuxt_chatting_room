const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const multer = require('multer');
const { cloneDeep } = require('lodash');

const { 
  encryptPassword, 
  verifyPassword,
  makeToken, 
  verifyAccessToken,
} = require('../utils/auth');

const { Users } = require('../models');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) { //저장될 경로
      done(null, __dirname + '/../../static/userProfiles/');
    },
    filename(req, file, done) { //파일명
      const ext = path.extname(file.originalname); //파일 확장자 추출
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

/**
 * 회원가입 또는 수정
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
    const mode = params.mode;
    if (mode === 'ins') {
      const data = {
        email: params.email,
        password: encryptPassword(params.password),
        name: params.name,
        nickName: params.nickName,
        image: file === undefined ? '' : file.filename,
        desc: params.desc || ''
      }
      await Users.create(data);
      rt.msg = 'ok';
    } else if (mode === 'upd') {
      const preData = await Users.findOne({email: params.email});

      const updData = {};
      // 패스워드는 입력받았을 경우에 수정.
      if (params.password) updData.password = encryptPassword(params.password);
      
      // 이름, 닉네임은 필수 입력 사항이라 기존 데이터랑 다른지 체크
      if (params.name !== preData.name) updData.name = params.name;
      if (params.nickName !== preData.nickName) updData.nickName = params.nickName;
      
      // 프로필 이미지 새로 등록시 기존 사진 데이터 삭제
      if (file) {
        updData.image = file.filename;
        if (preData.image !== '') {
          try {
            fs.unlinkSync(__dirname + '/../../static/userProfiles/' + preData.image);
          } catch (err) {
            console.log(`${preData.image} 파일 없음.`);
          }
        }
      }

      if (params.desc !== preData.desc) updData.desc = params.desc;
      
      if (Object.keys(updData).length === 0) {
        throw { message : '수정할 정보가 없습니다.'};
      }

      await Users.update({email: params.email}, updData);

      const user = await Users.findOne({email: params.email});
      const rtUser = user.toObject();
      delete rtUser.password;
      delete rtUser.token;
      rt.msg = 'upd';
      rt.result = rtUser;
    }
    rt.ok = true;
    
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

    const { access, refresh } = makeToken(user);
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