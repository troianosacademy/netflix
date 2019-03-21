const UserService = require('../../business/services/UserService');

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

}
