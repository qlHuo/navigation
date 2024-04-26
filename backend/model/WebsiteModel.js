const mongoose = require('mongoose');

const WebsiteSchema = new mongoose.Schema({
  // 网站名称
  title: {
    type: String,
    required: true,
  },
  // 网站URL
  url: {
    type: String,
    required: true,
  },
  // 网站Logo
  logo: {
    type: String,
  },
  // 网站简介
  description: {
    type: String,
  },
  // 创建人
  creator: {
    type: String,
  },
  // 创建时间
  createTime: {
    type: Date,
  },
  // 修改人
  modifier: {
    type: String,
  },
  // 修改时间
  modifyTime: {
    type: Date,
  },
  // 分类id
  categoryId: {
    type: String,
  },
  // 数据状态 0-删除，1-可用
  status: {
    type: Number,
    default: 1,
    enum: [0, 1]
  }
});

const WebsiteModel = mongoose.model('websites', WebsiteSchema);

module.exports = WebsiteModel;