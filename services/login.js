const { BaseError } = require("../core/baseError");
const { mongoDb } = require("../database/mongodb");

class LoginService {
  constructor() {}
  login = async ({ email, password }) => {
    try {
      const response = await mongoDb.User.findOne({ email: email });
      if (!response) throw new BaseError(`[err] user not found`);
      const userDetails = response;
      if (userDetails.password !== password) {
        throw new BaseError(`[err] user password incorrect`);
      }
      return {
        id: userDetails.id,
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
      };
    } catch (error) {
      console.log(error);
      throw new BaseError("[err] error while login!!!", error);
    }
  };
  signUp = async ({ email, password, firstName, lastName }) => {
    try {
      await mongoDb.User.create({ email, password, firstName, lastName });
    } catch (error) {
      throw new BaseError("[err] error while signUp!!!", error);
    }
  };
}

module.exports = LoginService;
