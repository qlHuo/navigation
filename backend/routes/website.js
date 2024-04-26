const express = require('express');
const router = express.Router();
const WebsiteModel = require('../model/WebsiteModel');
const moment = require('moment')

// 新增网站
router.post('/website', (req, res) => {
  WebsiteModel.create({
    ...req.body,
    createTime: moment().format()
  })
  .then(data => {
    res.json({
      success: true,
      msg: "创建成功",
      data: data,
    })
  })
  .catch(err => {
    res.json({
      success: false,
      msg: "创建失败",
      data: null
    })
  })
})

// 删除接口
router.delete('/website', (req, res) => {
  const { id } = req.body;
  WebsiteModel.findOneAndUpdate(
    {
      _id: id
    },
    { 
      status: 0
    }
  ).then(data => {
    res.json({
      success: true,
      msg: '删除成功',
      data: data
    })
  }).catch(err => {
    res.json({
      success: false,
      msg: '删除失败',
      data: err
    })
  })
})

// 修改接口
router.put('/website', (req, res) => {
  const { id, title, url, logo, description, categoryId } = req.body;
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
      modifyTime: moment().format(),
    }
  ).then(data => {
    res.json({
      success: true,
      msg: '编辑成功',
      data: data
    })
  }).catch(err => {
    res.json({
      success: false,
      msg: '编辑成功',
      data: err
    })
  })
})

// 查询接口
router.get('/website/list', (req, res) => {
  WebsiteModel.find({
    status: 1
  })
  .then(data => {
    res.json({
      success: true,
      msg: '查询成功',
      data: data
    })
  })
  .catch(err => {
    res.json({
      success: false,
      msg: '查询失败',
      data: err
    })
  })
});


module.exports = router;