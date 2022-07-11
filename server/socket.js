const SocketIO = require('socket.io');
const axios = require('axios');
module.exports = (server, app) => {
  const io = SocketIO(server, {
    path: '/socket.io',
    cors: {
      origin: '*',
      methods: ["GET", "POST"]
    }
  });
  app.set('io', io); 
  const room = io.of('/room'); //채팅방 네임스페이스
  const chat = io.of('/chat'); //채팅 네임스페이스

  //채팅방 소켓
  room.on('connection', (socket) => {
    console.log(`room 네임스페이스 접속`);
         
    socket.on('disconnect', () => {
      console.log(`room 네임스페이스 해제`);
    });
  });

  //채팅 소켓
  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스 접속');
    
    //방 접속
    socket.on('join', (data) => {
      const roomId = data.roomId;
      const user = data.user;
      socket.join(roomId); 
      socket.to(roomId).emit('message', {
        type:'system',
        user: null,
        message: `${user.nickName} 님이 입장하셨습니다.`
      });
    })
    //메세지 보내기
    socket.on('sendMessage', (data) => {
      const roomId = data.roomId;
      const user = data.user;
      const msg = data.msg;
      socket.to(roomId).emit('message', {
        type: 'user',
        user: user.nickName,
        message: msg,
      });
    })
    //방 나가기
    socket.on('exit', async (data) => {
      const roomId = data.roomId;
      const user = data.user;
      socket.leave(roomId);
      const currentRoom = socket.adapter.rooms.get(roomId); //현재 방에 참여중인 소켓 정보?
      const userCount = currentRoom ? currentRoom.size : 0;
      if (userCount === 0) {
        //채팅방에 남아있는 사람이 없으면 방 삭제
        const rs = await axios.delete(`${process.env.api_host}/api/room/${roomId}`);
        console.log('room Remove result : ', rs.data);
      } else {
        socket.to(roomId).emit('message', {
          type: 'system',
          user: null,
          message: `${user.nickName} 님이 퇴장하셨습니다.`,
        });
      }
    })
    socket.on('disconnect', async () => {
      console.log('chat 네임스페이스 해제');
    })
  })
} 