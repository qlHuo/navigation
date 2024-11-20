// 定义全局数据返回格式
module.exports = (req, res, next) => {
  req.formatData = (success = true, msg = '操作成功', data = null) => {
    res.json({
      success,
      msg,
      data
    })
  }
  next();
}