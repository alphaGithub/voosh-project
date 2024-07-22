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
      throw new BaseError("[err] error while login!!!", error);
    }
  };
  getUser = async (id) => {
    try {
      const response = await mongoDb.User.findOne({ _id: id });
      if (!response) throw new BaseError(`[err] user not found`);
      const userDetails = response;
      return {
        id: userDetails.id,
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
      };
    } catch (error) {
      throw new BaseError("[err] error while login!!!", error);
    }
  };
  signUp = async ({ email, password, firstName, lastName }) => {
    try {
      const userDetails = await mongoDb.User.create({
        email,
        password,
        firstName,
        lastName,
      });
      return {
        id: userDetails.id,
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
      };
    } catch (error) {
      throw new BaseError("[err] error while signUp!!!", error);
    }
  };
}

module.exports = LoginService;
