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

  room.on('connection', async (socket) => {
    const req = socket.request;
    console.log(`room 네임스페이스 접속`);
         
    socket.on('disconnect', () => {
      console.log(`room 네임스페이스 해제`);
    });
  });
} 