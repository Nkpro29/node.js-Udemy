const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

//1) Middlewares
console.log(process.env.NODE_ENV);
app.use(morgan('dev')); // get the information of the request using morgan.

app.use(express.json()); //middleware between request and response.
app.use(express.static(`${__dirname}/public`)); //serving the static files.

//middleware
app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Routes
app.use('/api/v1/tour', tourRouter);
app.use('/api/v1/user', userRouter);

//error handling
// app.all('*',(req, res, next) => {
//   next(new AppError(`can't find ${req.originalUrl} on this server`));
// });

// app.use(globalErrorHandler);

module.exports = app;
