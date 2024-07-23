const { body } = require("express-validator");
const { TASK_STATUS } = require("../constants");

exports.loginValidator = [
  body("email").exists().withMessage("[err] email required!"),
  body("password").exists().withMessage("[err] password required!"),
];
exports.signUpValidator = [
  body("email").exists().withMessage("[err] email required!"),
  body("password").exists().withMessage("[err] password required!"),
  body("firstName").exists().withMessage("[err] firstName required!"),
  body("lastName").exists().withMessage("[err] lastName required!"),
];
exports.getTaskValidator = [
  body("status")
    .optional()
    .isString()
    .custom((status) => {
      if (
        Object.keys(TASK_STATUS)
          ?.map((item) => TASK_STATUS[item])
          ?.includes(status)
      )
        return true;
      return false;
    })
    .withMessage("[err] invalid status"),
];
exports.createTaskValidator = [
  body("name")
    .exists()
    .isString()
    .isLength({ min: 1 })
    .withMessage("[err] name required!"),
  body("description")
    .exists()
    .isString()
    .isLength({ min: 1 })
    .withMessage("[err] description required!"),
  body("status")
    .optional()
    .isString()
    .custom((status) => {
      if (
        Object.keys(TASK_STATUS)
          ?.map((item) => TASK_STATUS[item])
          ?.includes(status)
      )
        return true;
      return false;
    })
    .withMessage("[err] invalid status"),
];
exports.updateTaskValidator = [
  body("name")
    .optional()
    .isString()
    .isLength({ min: 1 })
    .withMessage("[err] name required!"),
  body("description")
    .optional()
    .isString()
    .isLength({ min: 1 })
    .withMessage("[err] description required!"),
  body("status")
    .optional()
    .isString()
    .custom((status) => {
      if (
        Object.keys(TASK_STATUS)
          ?.map((item) => TASK_STATUS[item])
          ?.includes(status)
      )
        return true;
      return false;
    })
    .withMessage("[err] invalid status"),
];
exports.deleteTaskValidator = [
  body("id").exists().withMessage("[err] invalid taskId required!"),
];
