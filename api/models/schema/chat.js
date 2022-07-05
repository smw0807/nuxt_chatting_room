/**
 * 채팅 메세지 스키마
 * 화면에 보여줄 채팅 내용
 */
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const chatSchema = new Schema({
  //방 아이디
  room: {
    type: ObjectId,
    required: true,
    ref: 'room'
  },
  //채팅 메시지 입력한 사용자
  nickName: {
    type: String,
    required: true,
    ref: 'users'
  },
  //채팅 내용
  chat: String,
  //이미지 첨부시 이미지 정보
  img: String,
  //채팅 메시지 전송 시간
  sendDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.chat || mongoose.model('chat', chatSchema);