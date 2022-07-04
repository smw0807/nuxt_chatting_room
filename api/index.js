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



app.use('/user', require('./routes/user'));
app.use('/auth', require('./routes/auth'));
// app.use('/room', verifyToken, require('./routes/room'));
app.use('/room', require('./routes/room'));

const server = app.listen(3001, () => {
  console.log('API Start');
})

// module.exports = app;