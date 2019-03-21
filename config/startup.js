const UserService = require('../app/business/services/UserService');

module.exports = async () => {
  await UserService.createFirstAdmin();
}
