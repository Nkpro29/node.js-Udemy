const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const { token } = require('morgan');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

exports.signUp = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const token = signToken(newUser._id)

  try {
    res.status(201).json({
      status: 'success',
      token: token,
      user: newUser,
    });
  } catch {
    res.status(404).json({
      status: 'fail',
      message: `User authentication isn't possible`,
    });
  }

  next();
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //check if the email and password exist
  if (!email || !password) {
    return next(new AppError(`please provide email and password`, 400));
  }

  //check if the user exists and password is correct
  const user = await User.findOne({ email }).select('+password'); // check the user on the basis of email.
  const correctPassword = user.correctPassword(password, user.password);

  if (!user || !correctPassword) {
    return next(new AppError(`Incorect email or password`, 401));
  }

  // if everything ok, send a token to the client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
};
