const jsonwebtoken = require('jsonwebtoken');
const { secret, expires } = require('../../config/index');

const JWT = {
  // 生成token的方法
  generate: (value) => {
    return jsonwebtoken.sign(value, secret, {
      expiresIn: expires
    });
  },

  // 校验token是否过期
  verify: (token) => {
    try {
      return jsonwebtoken.verify(token, secret);
    } catch (error) {
      return false;
    }
    
  }
};

module.exports = JWT;