var express = require('express')
var path = require('path')


var app = express();
var indexRouter = require('./routes/index');
app.use(require('./db/mongo'))


//View Engine setup

var mustacheExpress = require("mustache-express");
const { any } = require('joi');
var engine = mustacheExpress();
app.engine("mustache", engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use('/', indexRouter);

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