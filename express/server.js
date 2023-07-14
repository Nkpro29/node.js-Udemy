const dotenv = require('dotenv');
// dotenv.config({path:'./config.env'});

const app = require('./app');

const port = process.env.NODE_ENV || 3000;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});