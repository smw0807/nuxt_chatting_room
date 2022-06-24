const mongoose = require('mongoose');

const { mongo_url, mongo_db } = process.env;

mongoose.connect(mongo_url, {
  dbName: mongo_db,
}, (error) => {
  if (error) {
    console.log('몽고디비 연결 에러', error);
  } else {
    console.log('몽고디비 연결 성공');
  }
});

mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다.');
});