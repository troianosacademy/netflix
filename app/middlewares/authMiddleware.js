module.exports = (role, loginRoute) => {
  return (req, res, next) => {
    if (req.url != "/") {
      loginRoute += "?returnUrl=" + encodeURIComponent(req.url);
    }

    if (req.session.user == null || (req.session.user != null && req.session.user.roles.indexOf(role) == -1)) return res.redirect(loginRoute);
    return next();
  }
}
