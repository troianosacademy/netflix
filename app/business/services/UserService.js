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

  setDisabled: async (id, value) => { console.log("service"); await UserRepository.setDisabled(id, value)},

  login: async (email, password) => {
    let validation = await UserValidator.login(email, password);

    if (validation.isValid) {
      await UserRepository.setLastLogin((await UserRepository.getByEmail(email))._id, new Date());
    }

    return validation;
  },

  update: async (user) => {
    let validation = await UserValidator.update(user);

    if (!validation.isValid) {
      return { errors: validation.errors };
    }

    let modifyUser = {
      _id: user._id,
      fullname: user.fullname
    }

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
        disabled: false,
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
    user.disabled = false;

    let result = await UserRepository.insert(user);

    if (result._id != null && role != null)
      await UserRepository.addRole(result._id, role);

    return result;
  },

  edit: async (user) => {
    let validation = await UserValidator.edit(user);

    if (!validation.isValid) {
      return validation;
    }

    let modifyUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    }

    if(user.password != null && user.password != ''){
      modifyUser.password = md5(user.password);
    } 

    return await UserRepository.update(modifyUser);
  }
};
