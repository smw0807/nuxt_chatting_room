import express from 'express';
import SocketIO from 'socket.io';

const app = express();

let server = null;
let io = null;

app.all('/init', (req, res) => {
  console.log("socket test");
  if (!server) {
    server = res.connection.server;
    io = SocketIO(server);

    const room = io.of('/room');
    room.on('connection', (socket) => {
      console.log('room 네임스페이스 접속');
      
      socket.on('gg', (data) => {
        console.log('text message : ', data);
      })
      
      setInterval(() => {
        socket.emit('go', 'gogo');
      }, 3000);
      
      socket.on('disconnect', () => {
        console.log('room 네임스페이스 접속 해제');
      });
    });
  }
  res.json({ msg : 'socket.io ready'});
})

module.exports = app;