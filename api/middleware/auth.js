import { verifyAccessToken } from '../utils/auth';

exports.verifyToken = async (req, res, next) => {
  try {
    await verifyAccessToken(req.headers['access-token']);
    return next()
  } catch (err) {
    console.log('API Middleware verityToken Error : ', err.message);
    if (err.message.indexOf('malformed') !== -1) { //토큰 없을 때
      return res.status(419).json({
        message: 'accessToken 없음'
      })
    }
    if (err.message.indexOf('invalid') !== -1) { //유효하지 않은 토큰
      return res.status(401).json({
        message: '유효하지 않은 토큰입니다'
      })
    }
  }
}