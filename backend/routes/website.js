const express = require('express');
const router = express.Router();
const WebsiteModel = require('../model/WebsiteModel');
const moment = require('moment')
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');

// 新增网站
router.post('/website', checkTokenMiddleware, (req, res) => {
  const { username } = req.userInfo;
  WebsiteModel.create({
    ...req.body,
    creator: username,
    createTime: moment().format()
  })
  .then(data => {
    req.formatData(true, '创建成功', data);
  })
  .catch(err => {
    req.formatData(false, '创建失败', null);
  })
})

// 删除接口
router.delete('/website', checkTokenMiddleware, (req, res) => {
  const { id } = req.body;
  WebsiteModel.findOneAndUpdate(
    {
      _id: id
    },
    { 
      status: 0
    }
  ).then(data => {
    req.formatData(true, '删除成功', data)
  }).catch(err => {
    req.formatData(false, '删除失败', err)
  })
})

// 修改接口
router.put('/website', checkTokenMiddleware, (req, res) => {
  const { id, title, url, logo, description, categoryId } = req.body;
  const { username } = req.userInfo;
  WebsiteModel.findOneAndUpdate(
    // 查询参数
    { 
      _id: id
    },
    // 修改参数
    { 
      title, 
      url, 
      logo, 
      description, 
      categoryId,
      modifier: username,
      modifyTime: moment().format(),
    }
  ).then(data => {
    req.formatData(true, '编辑成功', data)
  }).catch(err => {
    req.formatData(false, '编辑失败', err)
  })
})

// 查询接口
router.get('/website/list', checkTokenMiddleware, (req, res) => {
  WebsiteModel.find({
    status: 1
  })
  .then(data => {
    req.formatData(true, '查询成功', data)
  })
  .catch(err => {
    req.formatData(false, '查询失败', err)
  })
});


module.exports = router;