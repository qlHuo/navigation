const mongoose = require('mongoose');

const WebsiteCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
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
  // 数据状态 0-删除，1-可用
  status: {
    type: Number,
    default: 1,
    enum: [0, 1]
  }
});

const WebsiteCategoryModel = mongoose.model('website-categoies', WebsiteCategorySchema)

module.exports = WebsiteCategoryModel;
