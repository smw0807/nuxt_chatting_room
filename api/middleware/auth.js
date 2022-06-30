
exports.verifyToken = async (req, res, next) => {
  console.log('verifyToken');
  console.log(req.headers['access-token']);
  console.log(req.headers['refresh-token']);
  return next();
}