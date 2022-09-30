// check for existence of a session property. if false, it will call `next( )` which could
// potentially be another middleware function/final function that will render template
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;