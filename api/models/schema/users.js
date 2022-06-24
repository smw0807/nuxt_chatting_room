/**
 * 사용자 스키마
 */

import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
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
  image: String,
  desc: String
})

module.exports = mongoose.models.users || mongoose.model('users', userSchema);