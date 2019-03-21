const CategoryRepository = require('../repositories/CategoryRepository');

module.exports = {

  save: async (category) => {
    let errors = [];

    if (category.name == null || category.name.length < 3) {
      errors.push('A categoria deve conter no mínimo 3 caracteres');
    } else if (category._id != null) {
      let find = await CategoryRepository.getByName(category.name);

      if (find != null && find._id != category._id) {
        errors.push('Já existe uma categoria cadastrada com este nome');
      }
    }

    return { isValid: errors.length == 0, errors };
  }

}
