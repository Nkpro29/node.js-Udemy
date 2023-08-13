const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a user cannot exist without a username.'],
  },
  email: {
    type: String,
    required: [true, 'a user should fill his/her email ID'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide valid email'],
  },
  photo: [String],
  password: {
    type: String,
    required: [true, 'a user should fill his/her password'],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [
      true,
      'cannot proceed further without entering confirm password.',
    ],
    validate: {
      //this only works if we save
      validator: function (el) {
        return el === this.password;
      },
    },
  },
});

userSchema.pre('save', async function (next) {
  //only run this function if password was actually modified.
  if (!this.isModified('password')) return next();

  //password is hashed with the cost of 12.
  //cost specify the number of cycles to use in algorithm
  this.password = await bcrypt.hash(this.password, 12);

  //delete the confirm password.
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
  return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
