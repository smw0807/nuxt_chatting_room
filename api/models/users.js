/**
 * 사용자 스키마
 */

import mongoose from "mongoose";

const { Schema } = mongoose;

const users = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
  },
  age: Number,
  gender: String,
  image: {
    data: Buffer,
    contentsType: String,
  },
  desc: String
})

module.exports = mongoose.model('users', users);