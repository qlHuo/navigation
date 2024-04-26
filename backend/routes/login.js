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
      res.json({
        success: true,
        msg: "注册成功",
        data: data
      })
    })
    .catch(err => {
      res.json({
        success: false,
        msg: "注册失败",
        data: err
      })
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
      if(!data){
        return res.json({
          success: false,
          msg: '用户名或密码错误',
          data: null
        })
      }
      
      // 创建当前用户的 token
      const token = jwt.sign({
        username: data.username,
        _id: data._id
      }, secret, {
        expiresIn: 60 * 60 * 24 * 7
      });
      
      //响应 token
      res.json({
        success: true,
        msg: '登陆成功',
        data: token
      })
    })
    .catch(err => {
      res.json({
        success: false,
        msg: '登陆失败',
        data: err
      })
    })
});

//退出登录
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    msg: "登出成功",
    data: null
  });
});

module.exports = router;
