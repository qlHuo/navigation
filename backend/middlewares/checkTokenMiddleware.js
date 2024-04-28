const jwt = require('jsonwebtoken');
const { secret } = require('../config/index');

module.exports = (req, res, next) => {
  const token = req.get('token');
  if (!token) {
    return req.formatData(false, 'token 不存在')
  }
  
  // 校验token
  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return req.formatData(false, 'token 校验失败')
    }
    // 保存用户信息
    req.userInfo = data;
    next();
  })
}
