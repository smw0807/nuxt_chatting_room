import express from 'express';
import Morgan from 'morgan';
import { verifyToken } from './middleware/auth';

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
app.use('/room', verifyToken, require('./routes/room'));


module.exports = app;