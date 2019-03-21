const UserRepository = require('../repositories/UserRepository');
const md5 = require('md5');

module.exports = {

  login: async (email, password) => {
    let errors = [];

    if (email == null || email.indexOf('@') <= 0) {
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

    if (user.email == null || user.email.indexOf('@') <= 0) {
      errors.push("Informe seu e-mail corretamente");
    }

    if (user.fullname == null || user.fullname.trim().indexOf(' ') <= 0) {
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

    if (user.fullname == null || user.fullname.trim().indexOf(' ') <= 0) {
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
  }
}
