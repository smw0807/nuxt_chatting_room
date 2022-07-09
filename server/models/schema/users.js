/**
 * 사용자 스키마
 */

const mongoose = require("mongoose");
const moment = require('moment');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { //이메일
    type: String,
    required: true,
    unique: true,
  },
  password: { //비밀번호
    type: String,
    required: true,
  },
  name: { //이름
    type: String,
    required: true,
  },
  nickName: { //닉네임
    type: String,
    required: true,
    unique: true,
  },
  image: String, // 프로필 사진
  desc: String, // 자기소개
  token: {
    type: String,
    default: null,
  }, // 토큰 (로그인 시 넣어줌);
  signUpDt: { // 가입일
    type: Date,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  }
});

module.exports = mongoose.models.users || mongoose.model('users', userSchema);

/**
 * 고민사항
 * 토큰 2개를 다 저장시킬까, 리프레시만 저장시킬까
 * https://velog.io/@park2348190/JWT%EC%97%90%EC%84%9C-Refresh-Token%EC%9D%80-%EC%99%9C-%ED%95%84%EC%9A%94%ED%95%9C%EA%B0%80
 */