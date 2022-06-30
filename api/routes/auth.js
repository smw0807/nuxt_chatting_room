/**
 * 권한 관련
 */

import express from 'express';
const router = express.Router();
import { cloneDeep } from 'lodash';

import { 
  encryptPassword, 
  verifyPassword,
  makeToken, 
  verifyAccessToken,
} from '../utils/auth';

router.post('/verify', async (req, res) => {
  const rt = {
    ok: false,
    msg: '',
    result: null
  }
  try {
    const check = await verifyAccessToken(req.headers['access-token']);
    console.log('check!!: ', check);
  } catch (err) {
    console.error('/auth/verify Error : ', err);
    rt.msg = err.message;
    rt.result = err;
  }
  res.send(rt);
})

module.exports = router;