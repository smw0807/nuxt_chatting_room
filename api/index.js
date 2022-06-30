import express from 'express';
import { verifyToken } from './middleware/auth';

require('dotenv').config();
require('./mongo/connect'); // 몽고디비 연결

const app = express();
app.use(express.json());
app.use(verifyToken);

app.post('/test', (req, res) => {
  console.log('api test...');
  res.send('api success');
})

app.use('/user', require('./routes/user'));
app.use('/auth', require('./routes/auth'));


module.exports = app;