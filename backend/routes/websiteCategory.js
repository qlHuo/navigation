const express = require('express');
const router = express.Router();
const WebsiteCategoryModel = require('../model/WebsiteCategory')
const moment = require('moment');

// 新建分类
router.post('/website/category', (req, res) => {
  // 非空校验
  WebsiteCategoryModel.create({
    ...req.body,
    createTime: moment().format()
  }).then(data => {
    res.json({
      success: true,
      msg: '创建成功',
      data
    })
  }).catch(err => {
    res.json({
      success: false,
      msg: '创建失败',
      data: err
    })
  })
});

// 删除接口
router.delete('/website/category/:id', (req, res) => {
  console.log("delete", req.params)
  const { id } = req.params;
  WebsiteCategoryModel.findByIdAndUpdate(
    {
      _id: id,
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

// 修改网站分类
router.patch('/website/category/:id', (req, res) => {
  const { id } = req.params;
  const { title, index }  = req.body;
  WebsiteCategoryModel.findByIdAndUpdate(
    {
      _id: id
    },
    {
      title,
      index,
      modifyTime: moment().format()
    }
  )
  .then(data => {
    res.json({
      success: true,
      msg: '修改成功',
      data,
    })
  })
  .catch(err => {
    res.json({
      success: false,
      msg: '修改失败',
      data: err,
    })
  })
})


// 获取网站分类：获取当前登录人创建的分类
router.get('/website/category/list', (req, res) => {
  WebsiteCategoryModel.find(
    {
      status: 1
    },
  ).then(data => {
    res.json({
      success: true,
      msg: '获取成功',
      data,
    })
  }).catch(err => {
    res.json({
      success: false,
      msg: '获取失败',
      data: err,
    })
  })
})

module.exports = router;