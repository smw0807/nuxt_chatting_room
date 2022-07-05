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
    const req = socket.request;
    console.log(`room 네임스페이스 접속`);
         
    socket.on('disconnect', () => {
      console.log(`room 네임스페이스 해제`);
    });
  });

  chat.on('connection', (socket) => {
    const req = socket.request;
    console.log('chat 네임스페이스 접속');
    // console.log(req.headers);

    socket.on('disconnect', async () => {
      console.log('chat 네임스페이스 해제');
    })
  })
} 