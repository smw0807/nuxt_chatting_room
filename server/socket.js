const SocketIO = require('socket.io');
const axios = require('axios');

function serverURL() {
  const { server_protocol, server_host, server_port } = process.env;
  return `${server_protocol}://${server_host}:${server_port}`
}

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
    
    //방 접속 메시지 및 접속자 정보 보내기
    socket.on('join', (data) => {
      const roomId = data.roomId;
      const user = data.user;
      socket.join(roomId); 

      socket.to(roomId).emit('message', {
        type:'system-in',
        user: user,
        message: `${user.nickName} 님이 입장하셨습니다.`
      });
    })

    //사용자가 입력한 메세지 보내기
    socket.on('sendMessage', (data) => {
      const roomId = data.roomId;
      const user = data.user;
      const message = data.message;
      socket.to(roomId).emit('message', {
        type: 'user',
        user: user,
        message: message,
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
        const rs = await axios.delete(`${serverURL()}/api/room/${roomId}`);
        chatUsers.delete(roomId);
        console.log('room Remove result : ', rs.data);
        console.log('delete ', chatUsers);
      } else {
        //채팅방에 남아있는 사람이 있으면 퇴장 메세지 전달
        socket.to(roomId).emit('message', {
          type: 'system-out',
          user: user, //접속중 사용자 목록에서 제거하는데 사용
          message: `${user.nickName} 님이 퇴장하셨습니다.`,
        });
        //나간 사용자를 제외한 최신 정보 전달
        const rUsers = chatUsers.get(roomId);
        const users = rUsers.filter(x => x.nickName !== user.nickName);
        chatUsers.set(roomId, users);
        socket.to(roomId).emit('chatUsers', chatUsers.get(roomId));
      }
    })
    
    socket.on('disconnect', async (data) => {
      console.log('chat 네임스페이스 해제 , ', data);
    })
  })
} 