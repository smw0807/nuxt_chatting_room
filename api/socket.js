const express = require('express');
const SocketIO = require('socket.io');

import { verifyRefreshToken } from './utils/auth';

const app = express();

let server = null;
let io = null;

app.get('/init', (req, res) => {
  if (!server) {
    
    server = res.connection.server;
    io = SocketIO(server);
    app.set('io', io);
    
    const room = io.of('/room');
    room.on('connection', async (socket) => {
      const user = await verifyRefreshToken(socket.request.headers['refresh-token']);
      console.log(`room 네임스페이스 접속 [${user.nickName}]`);
           
      socket.on('disconnect', () => {
        console.log(`room 네임스페이스 해제 [${user.nickName}]`);
      });
    });
  }
  res.json({ msg : 'socket.io ready'});
})


module.exports = app;

// module.exports = (server, app) => {

// }