const express = require('express');
const router = express.Router();
//导入 jwt
const jwt = require('jsonwebtoken');
//导入配置文件
const {secret} = require('../config')
//导入 用户的模型
const UserModel = require('../model/UserModel');
const md5 = require('md5');

// 注册接口
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  UserModel.create({ username, password: md5(password) })
    .then(data => {
      req.formatData(true, '注册成功', data)
    })
    .catch(err => {
      req.formatData(false, '注册失败', err)
    })
})

//登录操作
router.post('/login', (req, res) => {
  //获取用户名和密码
  const { username, password } = req.body;
  //查询数据库
  UserModel.findOne({ username, password: md5(password) })
    .then(data => {
      //判断 data
      if(!data) {
        return req.formatData(false, '用户名或密码错误');
      }
      
      // 创建当前用户的 token
      const token = jwt.sign({
        username: data.username,
        _id: data._id
      }, secret, {
        expiresIn: 60 * 60 * 24 * 7
      });
      
      //响应 token
      req.formatData(true, '登陆成功', token)
    })
    .catch(err => {
      req.formatData(false, '登陆失败', err)
    })
});

//退出登录
router.post('/logout', (req, res) => {
  req.formatData(true, '登出成功')
});

module.exports = router;
