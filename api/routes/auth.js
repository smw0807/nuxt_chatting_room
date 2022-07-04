/**
 * 권한 관련
 */
const express = require('express');
const router = express.Router();

const { 
  makeToken, 
  verifyAccessToken,
  verifyRefreshToken,
} = require('../utils/auth');

const { Users } = require('../models');

/**
 * accessToken 검증
 * 이상 없으면 전달받은 refreshToken 검증
 * 이상 없으면 사용자 정보에 있는 token 데이터와 일치하는지 확인
 */
router.post('/verify', async (req, res) => {
  const rt = {
    ok: false,
    msg: '',
    result: null
  }
  try {
    await verifyAccessToken(req.headers['access-token']);
    rt.ok = true;
    rt.msg = 'ok';
  } catch (err) {
    console.error('/auth/verify Error : ', err);
    rt.msg = err.message;
    rt.result = err;
  }
  res.send(rt);
})

/**
 * refreshToken 검증
 * 이상 없으면 재발금 후 사용자 정보에 token도 업데이트
 */
router.post('/refresh', async (req, res) => {
  const rt = {
    ok: false,
    msg: '',
    result: null,
  }
  try {
    const reqRefresh = req.headers['refresh-token'];
    //refreshToken 검증
    const check = await verifyRefreshToken(reqRefresh);
    //사용자 정보 가져오기 및 refreshToken 일치 여부 확인
    const user = await Users.findOne({emial: check.email});
    if (reqRefresh !== user.token) {
      console.log('refreshToken 변조 의심');
      throw { message: 'refreshToken 변조 의심'};
    }
    
    const {access, refresh} = makeToken(user);
    // 사용자 정보에 refresh Token 추가
    await Users.update({email: user.email}, {token: refresh});

    const rtUser = user.toObject();
    delete rtUser.password;
    delete rtUser.token;

    rt.ok = true;
    rt.msg = 'ok';
    rt.result = {
      rtUser,
      token: {
        access,
        refresh
      }
    }
  } catch (err) {
    console.error('/auth/refresh Error : ', err);
    rt.msg = err.message;
    rt.result = err;
  }
  res.send(rt);
})
module.exports = router;