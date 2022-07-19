const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');

/**
 * 채팅방에 접속중인 사용자들 정보
 */
router.post('/chatUsers', verifyToken, async (req, res) => {
  const rt = {
    ok: false,
    msg: '',
    result: null
  }
  try {
    const params = req.body;
    const roomId = params.roomId;
    const user = params.user;
    
    //방 접속자 정보 최신화해서 접속중인 사용자들에게 전달
    if (chatUsers.has(roomId)) { //방이 있을 경우
      const rUsers = chatUsers.get(roomId);
      const existsCheck = rUsers.find(x => x.nickName === user.nickName);
      if (!existsCheck) {
        rUsers.push(user);
        chatUsers.set(roomId, rUsers);
      }
    } else { //없을 경우
      chatUsers.set(roomId, [user]);
    }
    const socket = req.app.get('io');
    socket.of('/chat').to(roomId).emit('chatUsers', chatUsers.get(roomId));

    rt.ok = true;
    rt.msg = 'ok';
  } catch (err) {
    rt.msg = err.message;
    rt.result = err;
  }
  res.send(rt);
})

module.exports = router;