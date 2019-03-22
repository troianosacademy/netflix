const UserRepository = require('../repositories/UserRepository');
const UserRole = require('../constants/UserRole');

const md5 = require('md5');

module.exports = {

  login: async (email, password) => {
    let errors = [];

    if (email == null || !email.includes('@')) {
      errors.push("Informe seu e-mail corretamente");
    }

    if (password == null || password.length < 6) {
      errors.push("Informe a senha corretamente");
    } else if (!(await UserRepository.verifyEmailAndPassword(email, md5(password)))) {
      errors.push("E-mail ou senha inválidos");
    }

    return { isValid: errors.length == 0, errors };
  },

  register: async (user) => {
    let errors = [];

    if (user.email == null || !user.email.includes('@')) {
      errors.push("Informe seu e-mail corretamente");
    }

    if (user.fullname == null || !user.fullname.trim().includes(' ')) {
      errors.push("Informe seu nome completo");
    }

    if (user.password == null || user.password.length < 6) {
      errors.push("A senha deve conter no mínimo 6 caracteres");
    }

    if (!(await UserRepository.verifyEmailAvaliable(user.email))) {
      errors.push("Este e-mail já esta sendo usado por outro usuário");
    }

    return { isValid: errors.length == 0, errors };
  },

  update: async (user) => {
    let errors = [];

    if (user.fullname == null || !user.fullname.trim().includes(' ')) {
      errors.push("Informe o nome completo");
    }

    if (user.newPassword) {
      if (!(await UserRepository.verifyEmailAndPassword(user.email, md5(user.oldPassword)))) {
        errors.push("A senha atual não confere");
      } else if (user.newPassword.length < 6) {
        errors.push("A senha deve conter no mínimo 6 caracteres");
      }
    }

    return { isValid: errors.length == 0, errors };
  },

  edit: async (user) => {
    let errors = [];

    if (user.fullname == null || !user.fullname.trim().includes(' ')) {
      errors.push("Informe o nome completo");
    }

    if (user.email == null || !user.email.includes('@')) {
      errors.push("Informe seu e-mail corretamente");
    }

    if (user.fullname == null || !user.fullname.trim().includes(' ')) {
      errors.push("Informe seu nome completo");
    }

    if (user.password != '' && user.password.length < 6) {
      errors.push("A senha deve conter no mínimo 6 caracteres");
    }

    let findUser = await UserRepository.getById(user._id);

    if (findUser && findUser._id != user._id) {
      errors.push("Este e-mail já esta sendo usado por outro usuário");
    }

    if(user.roles == null || user.roles.length < 0){
      errors.push("O usuário deve estar em pelo menos uma role");
      user.roles = [UserRole.CUSTOMER];
    }

    return { isValid: errors.length == 0, errors };
  }
}
