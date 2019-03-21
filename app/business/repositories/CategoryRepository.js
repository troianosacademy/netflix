const Category = require('../models/Category');

module.exports = {
  getAll: async () => await Category.find(),

  getById: async (id) => await Category.findById(id),

  getByName: async (name) => await Category.findOne({ name: name }),

  insert: async (category) => Category.create(category),

  update: async (category) => Category.updateOne({ _id: category._id }, category),

  remove: async (id) => Category.findByIdAndRemove(id),

}
