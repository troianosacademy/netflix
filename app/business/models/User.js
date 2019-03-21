const mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  fullName: String,
  email: String,
  password: String,
  lastLogin: Date,
  roles: [String]
});
