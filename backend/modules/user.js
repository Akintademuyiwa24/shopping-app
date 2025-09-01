const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/
  },
  password: {
    type: String,
    required: true, 
    minlength: 6,
    maxlength: 100
  }, 
  createdAt: {
    type: Date,
    default: Date.now   }
  });

  const User = mongoose.model('User', userSchema);

  module.exports = {User}