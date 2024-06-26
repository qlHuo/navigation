/**
 * 
 * @param {*} success 数据库连接成功的回调
 * @param {*} error 数据库连接失败的回调
 */
module.exports = function (success, error) {
  //判断 error 为其设置默认值
  if(typeof error !== 'function'){
    error = () => {
      console.log('连接失败');
    }
  }
  // 导入 mongoose
  const mongoose = require('mongoose');
  // 导入 配置文件
  const {DBHOST, DBPORT, DBNAME} = require('../config/index');

  // 设置 strictQuery 为 true
  mongoose.set('strictQuery', true);

  // 连接 mongodb 服务 
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

  // 设置连接成功的回调  once 一次   事件回调函数只执行一次
  mongoose.connection.once('open', () => {
    success();
  });

  // 设置连接错误的回调
  mongoose.connection.on('error', () => {
    error();
  });

  //设置连接关闭的回调
  mongoose.connection.on('close', () => {
    console.log('连接关闭');
  });
}