const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './../../config.env' });
const Tour = require('./../../models/tourModel');

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB connected successfully');
  })
  .catch((error) => {
    console.error(`error: ${error}`);
    process.exit(1);
  });

//Import data to DB
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('DB is successfully loaded');
  } catch (error) {
    console.error(error);
  }
  process.exit();
};

//delete data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('DB is successfully deleted');
  } catch (error) {
    console.error(error);
  }
  process.exit();
};

if(process.argv[2] === '--import'){
    importData();
}
else if(process.argv[2] === '--delete'){
    deleteData();
}

console.log(process.argv);