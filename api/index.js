import express from 'express';

require('dotenv').config();
require('./mongo/connect'); // 몽고디비 연결

const app = express();
app.use(express.json());

app.post('/test', (req, res) => {
  console.log('api test...');
  res.send('api success');
})

app.use('/user', require('./routes/user'));

// const WebSocket = require('./socket');
// let server = null;
// app.use((req, res, next) => {
//   if (!server) {
//     server = res.connection.server;
//     WebSocket(server, app);
//   }
//   return next();
// })

// module.exports = {
//   path: '/api',
//   handler: app
// }
module.exports = app;