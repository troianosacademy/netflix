const UserRepository = require("../repositories/UserRepository");
const UserValidator = require("../validations/UserValidator");
const UserRole = require("../constants/UserRole");

var md5 = require("md5");

module.exports = {
  getAll: async () => await UserRepository.getAll(),

  getById: async id => await UserRepository.getById(id),

  getByEmail: async email => await UserRepository.getByEmail(email),

  verifyEmailAvaliable: async email => await UserRepository.verifyEmailAvaliable(email),

  getByEmailAndPassword: async (email, password) => await UserRepository.getByEmailAndPassword(email, md5(password)),

  login: async (email, password) => await UserValidator.login(email, password),

  setLastLogin: async (id, date) => await UserRepository.setLastLogin(id, date),

  insert: async (user, role) => {
    let validation = await UserValidator.register(user);

    if (!validation.isValid) {
      return { errors: validation.errors };
    }

    user.password = md5(user.password);

    let result = await UserRepository.insert(user);

    if (result._id != null)
      await UserRepository.addRole(result._id, role);

    return result;
  }
};
