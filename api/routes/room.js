import express from 'express';

const router = express.Router();

router.post('/test', async (req, res) => {
  console.log('test');
  res.send('ok');
})

/**
 * 방 만들기
 */
router.post('/create', async (req, res) => {
  
})

module.exports = router;