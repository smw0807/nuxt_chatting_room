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
    const user = await verifyAccessToken(req.headers['access-token']);
    const rs = await Room.create({
      title: params.title,
      password: params.password || '',
      owner: user.nickName,
      max: params.acceptableMaxCount
    })
    /**
     * todo 만들고 소켓 처리 어떻게 해야할 지 고민해야함
     */
    rt.ok = true;
    rt.msg = 'ok';
    rt.result = rs;
    
    const socket = req.app.get('io');
    socket.of('/room').emit('newRoom');
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
router.get('/room/:id', async (req, res) => {
  console.log("??????");
  const rt = {
    ok: false,
    msg: 'ok',
    result: null
  }
  try {
    // const _id = ;
    const room = await Room.findOne({_id: req.params.id});
    console.log(room);
    const socket = req.app.get('io');
    const { rooms } = socket.of('/chat').adapter;
    console.log(rooms);

  } catch (err) {
    rt.msg = err.message;
    rt.result = err;
  }
  res.send(rt);
})

module.exports = router;