const CategoryRepository = require("../repositories/CategoryRepository");
const CategoryValidator = require("../validations/CategoryValidator");

module.exports = {
  getAll: async () => await CategoryRepository.getAll(),

  getById: async id => await CategoryRepository.getById(id),

  getByName: async email => await CategoryRepository.getByName(email),

  remove: async id => await CategoryRepository.remove(id),

  save: async (category) => {

    let validation = await CategoryValidator.save(category);

    if (!validation.isValid) {
      return validation;
    }

    if (category._id == null || category._id == '') {
      category._id = null;
      return await CategoryRepository.insert(category);
    } else {
      return await CategoryRepository.update(category);
    }
  },

};
