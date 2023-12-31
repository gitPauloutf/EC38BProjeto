
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

var app = express();
var logRouter = require('./routes/logreg');
var crud = require('./routes/crud')

app.use(require('./db/mongo'))
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  preflightContinue: true,
}))

app.use(express.json());

app.use('/', logRouter);
app.use('/',crud);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send()
});

app.listen(3001)
console.log('listening on 3001')