const express = require('express');
const UserRouter = express.Router();
const UserController = require('../../controllers/admin/UserController');

// 注册接口 
UserRouter.post('/admin/register', UserController.register)

//登录操作
UserRouter.post('/admin/login', UserController.login);

//退出登录
UserRouter.post('/admin/logout', UserController.logout);

module.exports = UserRouter;
