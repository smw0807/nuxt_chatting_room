import express from 'express';
const router = express.Router();

import { encryptPassword } from '../utils/auth';

import { Users } from '../models';

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});

router.post('/test', async (req, res) => {
  try {
    const rs = await Users.find({});
    console.log(rs);
  } catch (err) {
    console.error(err);
  }
  res.send({ok: true, msg: 'ok'});
})

/**
 * 회원가입
 */
router.post('/sign-up', upload.single('image'), async (req, res) => {
  const rt = {
    ok: false,
    msg: '',
    result: null
  }
  try {
    const file = req.file;
    const params = JSON.parse(req.body.info);
    const data = {
      email: params.email,
      password: encryptPassword(params.password),
      name: params.name,
      nickName: params.nickName,
      image: file === undefined ? null : file.buffer.toString('base64'),
      desc: params.desc || ''
    }
    const rs = await Users.create(data);
    //rs에 저장된 정보 그대로 나옴
    // console.log('result : ', rs);
    rt.ok = true;
    rt.msg = 'ok';
  } catch (err) {
    console.error('sign-up Error : ', err);
    rt.msg = err.message;
    rt.result = err;
  }
  res.send(rt);
})

module.exports = router;