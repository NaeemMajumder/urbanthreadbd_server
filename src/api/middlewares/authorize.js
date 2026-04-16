const AppError = require("../../utils/AppError");

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError("এই কাজের permission নেই", 403);
    }
    next();
  };
};

module.exports = authorize;

