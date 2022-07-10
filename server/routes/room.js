const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');
const { verifyAccessToken } = require('../utils/auth');
const { Room } = require('../models');

router.post('/test', async (req, res) => {
  console.log('test');
  res.send('ok');
})

router.post('/list', async (req, res) => {
  const rt = {
    ok: false,
    msg: '',
    result: null
  }
  try {
    const list = await Room.find({}).sort({createdDate:  -1});
    rt.ok = true;
    rt.msg = 'ok';
    rt.result = list;
  } catch (err) {
    console.error('/room/list Error : ', err);
    rt.msg = err.message;
    rt.result = err;
  }
  res.send(rt);
})

/**
 * 방 만들기
 */
router.post('/create', verifyToken, async (req, res) => {
  const rt = {
    ok: false,
    msg: '',
    result: null,
  }
  try {
    const params = req.body;
    //토큰 검증
    const user = await verifyAccessToken(req.headers['access-token']);
    //방 생성
    const rs = await Room.create({
      title: params.title,
      password: params.password || '',
      owner: user.nickName,
      max: params.acceptableMaxCount
    })
    rt.ok = true;
    rt.msg = 'ok';
    rt.result = rs;

    //방 리스트 불러오기
    const socket = req.app.get('io');
    socket.of('/room').emit('loadRoom');
  } catch (err) {
    console.error('/room/create Error : ', err);
    rt.msg = err.message;
    rt.result = err;
  }
  res.send(rt);
})

/**
 * 방 입장
 */
router.get('/join/:id', verifyToken, async (req, res) => {
  const rt = {
    ok: false,
    msg: '',
    result: null
  }
  try {
    const user = await verifyAccessToken(req.headers['refresh-token']);
    const room = await Room.findOne({_id: req.params.id});
    const socket = req.app.get('io');
    const { rooms } = socket.of('/chat').adapter;
    /**
     * todo 접속하려는 방 접속인원 꽉 찼는지 확인하는 로직 추가
     * todo 접속하려는 방이 비밀번호 방이면 비밀번호 맞는지 확인하는 로직 추가
     */
    socket.of('/chat').to(req.params.id).emit('users', user);
    rt.ok = true;
    rt.msg = 'ok';
    rt.result = room;
  } catch (err) {
    rt.msg = err.message;
    rt.result = err;
  }
  res.send(rt);
})

/**
 * 방 삭제
 */
router.delete('/:id', async (req, res) => {
  const rt = {
    ok: false,
    msg: '',
    result: null,
  }
  try {
    const rs = await Room.remove({_id: req.params.id});
    const socket = req.app.get('io');
    socket.of('/room').emit('loadRoom');
    rt.ok = true;
    rt.msg = 'ok';
    rt.result = rs;
  } catch (err) {
    rt.msg = err.message;
    rt.result = err;
  }
  res.send(rt);
})

/**
 * 채팅 메세지 보내기
 */
// router.post('/:id/chat', async (req, res) => {
//   const rt = {
//     ok: false,
//     msg: '',
//     result: null,
//   }
//   try {
//   } catch (err) {
//     rt.msg = err.message;
//     rt.result = err;
//   }
//   res.send(rt);
// })

module.exports = router;