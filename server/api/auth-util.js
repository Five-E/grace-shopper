const mustBeAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    let err = new Error('forbidden');
    err.status = 403
    next(err)
  } else {
    next();
  }
}

module.exports = { mustBeAdmin }
