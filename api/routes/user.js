import express from 'express';
const router = express.Router();

import { Users } from '../models';

router.post('/test', async (req, res) => {
  try {
    const rs = await Users.find({});
    console.log(rs);
  } catch (err) {
    console.error(err);
  }
  res.send({ok: true, msg: 'ok'});
})

module.exports = router;