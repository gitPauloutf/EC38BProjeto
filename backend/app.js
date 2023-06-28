
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

var app = express();
var indexRouter = require('./routes/index');
var logRouter = require('./routes/logreg');
app.use(require('./db/mongo'))
app.use(cors({
  origin: '*'
}))

app.use(express.json());

app.use('/', indexRouter);
app.use('/', logRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send()
});

app.listen(3001)
console.log('listening on 3001')