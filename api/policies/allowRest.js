/**
 * allowREST
 * @class       policy.allowREST
 * @description Simple policy to allow any REST api call from address bar
 *         
 *
 */
module.exports = function(req, res, next) {

  var action = Utility.getRequestAction(req);
  

  // Allowed only in development mode
  var allowed=true;
 
  if (action=="find" && process.env.NODE_ENV!=='development') {
    // Disallow REST find from address bar in production unless csrf provided
    if (!req.param("_csrf"))  
        allowed=false;
  }
 
  if (allowed) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};
