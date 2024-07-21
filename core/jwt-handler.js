const jwt = require("jsonwebtoken");
const { BaseError } = require("./baseError");
const getJWTToken = (data) => {
  try {
    const secret = process.env.SECRET_KEY;
    const expiresIn = process.env.EXPIRE_TIME;
    const payload = {
      id: data.id,
      email: data.email,
    };
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
  } catch (error) {
    console.log(error);
    throw new BaseError(`[err] jwt token generation error`, error);
  }
};
const verifyToken = (token) => {
  try {
    const secret = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.log(error);
    throw new BaseError(`[err] jwt token verify error`, error);
  }
};
module.exports = { getJWTToken, verifyToken };
