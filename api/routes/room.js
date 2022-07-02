import express from 'express';

const router = express.Router();

router.post('/test', async (req, res) => {
  console.log('test');
  res.send('ok');
})

module.exports = router;