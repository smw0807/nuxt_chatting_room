import express from 'express';
import SocketIO from 'socket.io';

import { verifyRefreshToken } from './utils/auth';

const app = express();

let server = null;
let io = null;

app.get('/init', async (req, res) => {
  const user = await verifyRefreshToken(req.headers['refresh-token']);
  if (!server) {

    server = res.connection.server;
    io = SocketIO(server);
    app.set('io', io);

    const room = io.of('/room');
    room.on('connection', (socket) => {
      // console.log(`room 네임스페이스 접속`);
      console.log(`room 네임스페이스 접속 [${user.nickName}]`);
           
      socket.on('disconnect', () => {
        console.log(`room 네임스페이스 해제 [${user.nickName}]`);
        // console.log(`room 네임스페이스 접속 해제`);
      });
    });
  }
  res.json({ msg : 'socket.io ready'});
})


module.exports = app;