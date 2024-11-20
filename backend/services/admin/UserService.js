// 操作数据库层
const UserModel = require("../../models/UserModel");
const md5 = require('md5');

const UserService = {
  // 向数据库插入一条数据
  register: async ({ username, password }) => {
    const data = await UserModel.create({ username, password: md5(password) })
    return data;
  },

  login: async ({username, password}) => {
    //查询数据库
    const data = await UserModel.findOne({ username, password: md5(password) });
    return data;
  }
}

module.exports = UserService;