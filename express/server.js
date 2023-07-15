const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);//hosted database

mongoose.connect(DB, {
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology: true
}).then(con =>{
  console.log(con.connections);
  console.log('DB connected successfully');
}).catch(error =>{
  console.error(`error: ${error}`);
  process.exit(1);  
});

const tourSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    unique:true
  },
  price:{
    type: Number,
    required:true,
  },
  rating:{
    type: Number,
    default: 4.0
  }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name:"",
  price:500,
  rating:4.7
});

testTour.save().then((doc)=>{
  console.log(doc);
}).catch(err=>{
  console.error('Error: ',err);
}); 

const app = require('./app');


// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});