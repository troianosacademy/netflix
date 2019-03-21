const User = require('../models/User');

module.exports = {
  getAll: async () => await User.find(),

  getById: async (id) => await User.findById(id),

  getByEmail: async email => await User.findOne({ email }),

  verifyEmailAvaliable: async email => (await User.countDocuments({ email })) == 0,

  verifyEmailAndPassword: async (email, password) => (await User.countDocuments({ email, password })) > 0,

  getByEmailAndPassword: async (email, password) => User.findOne({ email, password }),

  setLastLogin: async (id, date) => User.updateOne({ _id: id }, { $set: { lastLogin: date } }),

  addRole: async (id, role) => User.updateOne({ _id: id }, { $push: { roles: role } }),

  insert: async (user) => User.create(user),

}
