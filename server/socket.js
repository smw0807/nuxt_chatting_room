const SocketIO = require('socket.io');
module.exports = (server, app) => {
  const io = SocketIO(server, {
    path: '/socket.io',
    cors: {
      origin: '*',
      methods: ["GET", "POST"]
    }
  });
  app.set('io', io); 
  const room = io.of('/room'); 
  const chat = io.of('/chat');

  room.on('connection', (socket) => {
    console.log(`room 네임스페이스 접속`);
         
    socket.on('disconnect', () => {
      console.log(`room 네임스페이스 해제`);
    });
  });

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
    socket.on('exit', (data) => {
      const roomId = data.roomId;
      const user = data.user;
      socket.leave(roomId);
      const currentRoom = socket.adapter.rooms.get(roomId); //현재 방에 참여중인 소켓 정보?
      const userCount = currentRoom ? currentRoom.size : 0;
      console.log('userCount? ', userCount);
      if (userCount === 0) {
        //todo 방에 남은 사람이 없으면 방 삭제 로직 추가
      } else {
        socket.to(roomId).emit('message', {
          type: 'system',
          user: null,
          message: `${user.nickName} 님이 퇴장하셨습니다.`,
        });
      }
    })
    // console.log(socket.adapter)
    socket.on('disconnect', async () => {
      console.log('chat 네임스페이스 해제');
    })
  })
} 