const UserService = require('../../business/services/UserService');
const UserRole = require("../../business/constants/UserRole");

module.exports = {
  logout: async (req, res) => {
    req.session.user = null;
    res.redirect('/login');
  },

  login: async (req, res) => {
    res.render('frontend/auth/login.html', { returnUrl: req.query.returnUrl });
  },

  sigin: async (req, res) => {
    let siginUser = await UserService.login(req.body.email, req.body.password);

    console.log(req.body)

    if (!siginUser.isValid) {
      res.render('frontend/auth/login.html', { email: req.body.email, errors: siginUser.errors });
    } else {
      req.session.user = await UserService.getByEmailAndPassword(req.body.email, req.body.password);

      if (req.body.returnUrl)
        return res.redirect(req.body.returnUrl);

      return res.redirect('/');
    }
  },

  register: (req, res) => {
    res.render('frontend/auth/register.html');
  },

  saveUser: async (req, res) => {
    let createUser = await UserService.insert(req.body, UserRole.CUSTOMER);

    if (createUser.errors) {
      res.render('frontend/auth/register.html', { body: req.body, errors: createUser.errors });
    } else {
      req.session.user = createUser;
      res.redirect('/');
    }
  },

  profile: (req, res) => {
    res.render('frontend/auth/profile.html', { user: req.session.user });
  },

  updateUser: async (req, res) => {
    req.body._id = req.session.user._id;
    let updateUser = await UserService.update(req.body)

    let user = req.session.user;
    user.fullname = req.body.fullname;

    if (updateUser.errors) {
      res.render('frontend/auth/profile.html', { user: user, errors: updateUser.errors });
    } else {
      req.session.user = user;
      res.redirect('/profile');
    }

  }
}
