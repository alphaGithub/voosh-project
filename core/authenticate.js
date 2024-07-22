const { mongoDb } = require("../database/mongodb");
const { BaseError } = require("./baseError");
const { verifyToken } = require("./jwt-handler");

const authMiddleWare = async (req, res, next) => {
  try {
    const token = req?.cookies?.user;
    if (!token) throw new Error("user not in cookie");
    const decoded = verifyToken(token);
    const response = await mongoDb.User.findOne({ _id: decoded.id });
    if (!response) throw new Error("user does not exits");
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (error) {
    next(new BaseError(`[err] user authentication failed`, error, 429));
  }
};

module.exports = { authMiddleWare };
