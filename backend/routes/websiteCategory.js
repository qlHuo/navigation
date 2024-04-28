const express = require('express');
const router = express.Router();
const WebsiteCategoryModel = require('../model/WebsiteCategory')
const moment = require('moment');
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');

// 新建分类
router.post('/website/category', checkTokenMiddleware, (req, res) => {
  const { username } = req.userInfo;
  // 非空校验
  WebsiteCategoryModel.create({
    ...req.body,
    creator: username,
    createTime: moment().format()
  }).then(data => {
    req.formatData(true, '创建成功', data)
  }).catch(err => {
    req.formatData(false, '创建失败', err)
  })
});

// 删除接口
router.delete('/website/category/:id', checkTokenMiddleware, (req, res) => {
  const { username } = req.userInfo;
  const { id } = req.params;
  WebsiteCategoryModel.findByIdAndUpdate(
    {
      _id: id,
      creator: username
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

// 修改网站分类
router.patch('/website/category/:id', checkTokenMiddleware, (req, res) => {
  const { id } = req.params;
  const { title, index }  = req.body;
  const { username } = req.userInfo;
  
  WebsiteCategoryModel.findOneAndUpdate(
    {
      _id: id,
      status: 0, 
      creator: username
    },
    {
      title,
      index,
      modifier: username,
      modifyTime: moment().format()
    }
  )
  .then(data => {
    req.formatData(true, '修改成功', data)
  })
  .catch(err => {
    req.formatData(false, '修改失败', err)
  })
})


// 获取网站分类：获取当前登录人创建的分类
router.get('/website/category/list', checkTokenMiddleware, (req, res) => {
  const { username } = req.userInfo;
  WebsiteCategoryModel.find(
    {
      status: 1,
      creator: username
    },
  ).then(data => {
    req.formatData(true, '获取成功', data)
  }).catch(err => {
    req.formatData(false, '获取失败', data)
  })
})


router.get('/website/category/:id', checkTokenMiddleware, (req, res) => {
  const { id } = req.params;
  WebsiteCategoryModel.find(
    {
      _id: id,
      status: 1,
    },
  ).then(data => {
    req.formatData(true, '获取成功', data)
  }).catch(err => {
    req.formatData(false, '获取失败', data)
  })
})

module.exports = router;