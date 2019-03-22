const mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  fullname: String,
  email: String,
  password: String,
  lastLogin: Date,
  roles: [String],
  disabled: Boolean,
});
