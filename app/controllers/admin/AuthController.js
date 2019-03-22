const UserService = require('../../business/services/UserService');
const UserRole = require('../../business/constants/UserRole');

module.exports = {
  logout: async (req, res) => {
    req.session.user = null;
    res.redirect('/admin/login');
  },

  login: async (req, res) => {
    res.render('admin/auth/login.html', { returnUrl: req.query.returnUrl });
  },

  sigin: async (req, res) => {
    let siginUser = await UserService.login(req.body.email, req.body.password);

    if (!siginUser.isValid) {
      res.render('admin/auth/login.html', { email: req.body.email, errors: siginUser.errors });
    } else {
      req.session.user = await UserService.getByEmailAndPassword(req.body.email, req.body.password);

      if (!req.query.returnUrl)
        return res.redirect('/admin');

      return res.redirect('/admin');
    }
  },

  index: async (req, res) => {
    return res.render('admin/user/index.html', { users: await UserService.getAll() });
  },

  edit: async (req, res) => {
    let user = await UserService.getById(req.params.id);
    user.password = null;
    return res.render('admin/user/edit.html', { UserRole, user });
  },

  save: async (req, res) => {
    let user = req.body;
    let editUser = await UserService.edit(user);
    
    if (editUser.errors) {
     user.password = null;
      res.render('admin/user/edit.html', { UserRole, user, errors: editUser.errors });
    } else {
      res.redirect('/admin/users');
    }   

  },

  setDisabled : async(req,res) => {
    console.log('controller');
    await UserService.setDisabled(req.query.id, req.query.value);
    return res.redirect('/admin/users');
  }

}
