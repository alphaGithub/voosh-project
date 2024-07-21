const { validationResult } = require("express-validator");
const { BaseError } = require("./baseError");

module.exports = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new BaseError(`Invalid request.`, { errors: errors.array() }, 400)
    );
  }
  next();
};
