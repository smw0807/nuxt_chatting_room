/**
 * 채팅방 스키마
 */
const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  //채팅방 제목
  title: {
    type: String,
    required: true,
  },
  //재팅방 비밀번호
  password: String,
  //채팅방 방장
  owner: {
    type: String,
    required: true,
  },
  //채팅방 최대 인원
  max: {
    type: Number,
    required: true,
    default: 10,
    min: 2,
    max: 20
  },
  //채팅방 생성 시간
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.room || mongoose.model('room', roomSchema);