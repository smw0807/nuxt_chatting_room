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

const server = app.listen(3001, () => {
  console.log('API Start');
})

const WebSocket = require('./socket');
WebSocket(server, app);
