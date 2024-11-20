//导入UserService
const UserService = require('../../services/admin/UserService');
const { JWT } = require('../../utils')

const UserController =  {
  // 注册
  register: async (req, res) => {
    try {
      const data = await UserService.register(req.body);
      return req.formatData(true,  '注册成功', data)
    } catch (error) {
      req.formatData(false,  '注册失败', error)
    }
  },
  
  // 登录
  login: async (req, res) => {
    try {
      const data = await UserService.login(req.body);
      //判断 data
      if(!data) {
        return req.formatData(false, '用户名或密码错误');
      }
      console.log('JWT', JWT)
      
      // 创建当前用户的 token
      const token = JWT.generate({
        username: data.username,
        _id: data._id
      });
      
      //响应 token
      req.formatData(true, '登陆成功', token)
    } catch (error) {
      console.log(error)
      req.formatData(false, '登陆失败', error)
    }
  },

  // 登出
  logout: async (req, res) => {
    req.formatData(true, null ,'登出成功')
  }
}
module.exports = UserController;