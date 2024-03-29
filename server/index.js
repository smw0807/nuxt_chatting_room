const express = require('express');
const Morgan = require('morgan');

require('dotenv').config();
require('./mongo/connect'); // 몽고디비 연결

const app = express();
app.use(Morgan('dev'));
app.use(express.json());

app.post('/test', (req, res) => {
  console.log('api test...');
  res.send('api success');
})

app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/room', require('./routes/room'));
app.use('/api/chat', require('./routes/chat'));

const server = app.listen(process.env.server_port, process.env.server_host, () => {
  console.log('API Start');
})
const chatUsers = new Map(); //생성된 채팅방에 사용자 정보 담을 용도.
global.chatUsers = chatUsers;

const WebSocket = require('./socket');
WebSocket(server, app);
