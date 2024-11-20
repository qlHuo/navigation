const { JWT } = require('../utils')

module.exports = (req, res, next) => {
  const token = req.get('token');
  if (!token) {
    return req.formatData(false, 'token 不存在')
  }
  
  const data = JWT.verify(token);
  if (!data) {
    return req.formatData(false, 'token 校验失败')
  }
  // 保存用户信息
  req.userInfo = data;
  next();
}
