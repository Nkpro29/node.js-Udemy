// module.exports = (req, res, next, err) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';

//   console.log(process.env.NODE_ENV);

//   // if(process.env.NODE_ENV === 'development'){
//   //     res.status(err.statusCode)
//   //     res.json({
//   //         error: err,
//   //         status: err.status,
//   //         message: err.message,
//   //         stack: err.stack
//   //       });

//   // }
//   // else if(process.env.NODE_ENV = 'production'){
//   //     res.status(err.statusCode).json({
//   //         status: err.status,
//   //         message: err.message,
//   //       });
//   // }

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });

//   // next();
// };

module.exports = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });

  next();
};
