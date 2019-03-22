module.exports = (role, loginRoute) => {
  return (req, res, next) => {
    if (req.url != "/") {
      loginRoute += "?returnUrl=" + encodeURIComponent(req.url);
    }

    if (req.session.user == null || (req.session.user != null && !req.session.user.roles.includes(role))) return res.redirect(loginRoute);
    return next();
  }
}
