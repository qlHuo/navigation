const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const websiteRouter = require('./routes/website');
const websiteCategoryRouter = require('./routes/websiteCategory');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 全局中间件
app.use((req, res, next) => {
  // 定义全局数据返回格式
  req.formatData = (success = true, msg = '操作成功', data = null) => {
    res.json({
      success,
      msg,
      data
    })
  }
  next();
})

app.use('/', indexRouter);
app.use('/api', loginRouter);
app.use('/api', websiteRouter);
app.use('/api', websiteCategoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
