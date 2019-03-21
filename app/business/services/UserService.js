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

  update: async (user) => {
    let validation = await UserValidator.update(user);

    if (!validation.isValid) {
      return { errors: validation.errors };
    }

    console.log(user)

    let modifyUser = {
      _id: user._id,
      fullname: user.fullname
    }
    console.log(modifyUser)

    if (user.newPassword) {
      modifyUser.password = md5(user.newPassword);
    }

    return await UserRepository.update(modifyUser);
  },

  createFirstAdmin: async function() {
    if (!(await UserRepository.hasAdminUser())) {
      await this.insert({
        fullname: 'System admin',
        password: 'admin.io',
        email: 'admin@io',
        roles: [UserRole.ADMIN, UserRole.CUSTOMER]
      });
    }
  },

  insert: async (user, role) => {
    let validation = await UserValidator.register(user);

    if (!validation.isValid) {
      return { errors: validation.errors };
    }

    user.password = md5(user.password);

    let result = await UserRepository.insert(user);

    if (result._id != null && role != null)
      await UserRepository.addRole(result._id, role);

    return result;
  }
};
