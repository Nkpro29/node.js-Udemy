const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'A tour must have name.'],
    unique: true,
    trim:true
  },
  duration:{
    type: Number,
    required: [true,'A tour must have duration.']
  },
  maxGroupSize:{
    type: Number,
    required: [true,'A tour must have maximum group suze.']
  },
  difficulty:{
    type: String,
    required: [true,'A tour must have difficulty.']
  },
  price: {
    type: Number,
    required: [true,'A tour must have price.']
  },
  priceDiscount:Number,
  summary:{
    type: String,
    trim:true
  },
  description:{
    type:String,
    trim:true
  },
  imageCover:{
    type:String,
    required: [true,'A tour must have image cover.']
  },
  images:[String],
  rating: {
    type: Number,
    default: 4.0,
  },
  createdAt:{
    type: Date,
    default: Date.now()
  },
  startDates:[Date],
},

{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

tourSchema.virtual('durationWeeks').get(function(){
  return this.duration/7;
})
//when a certain property is dependent on other property than virtual properties can be used.



const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
