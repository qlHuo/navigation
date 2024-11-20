const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const websiteOldRouter = require('./routes/website');
const websiteCategoryOldRouter = require('./routes/websiteCategory');
const { UserRouter, WebsiteRouter, WebsiteCategoryRouter } = require('./routes/admin');
const globalFormatDataMiddleware = require('./middlewares/globalFormatDataMiddleware');

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
app.use(globalFormatDataMiddleware);

app.use('/', indexRouter);
app.use('/api', websiteOldRouter);
app.use('/api', websiteCategoryOldRouter);
app.use('/api', UserRouter);
app.use('/api', WebsiteRouter);
app.use('/api', WebsiteCategoryRouter)

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
