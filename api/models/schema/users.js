/**
 * 사용자 스키마
 */

import mongoose from "mongoose";
import moment from 'moment';

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