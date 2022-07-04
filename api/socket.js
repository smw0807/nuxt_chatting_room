import express from 'express';
import SocketIO from 'socket.io';

import { verifyRefreshToken } from './utils/auth';

const app = express();

let server = null;
let io = null;

app.get('/init', async (req, res) => {
  if (!server) {
    // const user = await verifyRefreshToken(req.headers['refresh-token']);

    server = res.connection.server;
    io = SocketIO(server);
    app.set('io', io);

    const room = io.of('/room');
    room.on('connection', (socket) => {
      console.log(`room 네임스페이스 접속`);
           
      socket.on('disconnect', () => {
        console.log(`room 네임스페이스 접속 해제`);
      });
    });
  }
  res.json({ msg : 'socket.io ready'});
})


module.exports = app;