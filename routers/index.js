const Controller = require("../controller");
const { authMiddleWare } = require("../core/authenticate");
const useValidation = require("../core/useValidation");
const {
  loginValidator,
  signUpValidator,
  createTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
  getTaskValidator,
} = require("../validators");

const registerRoutes = (app) => {
  const controller = new Controller();
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });
  app.post("/login", loginValidator, useValidation, controller.login);
  app.post("/signUp", signUpValidator, useValidation, controller.signUp);
  app.get(
    "/task",
    getTaskValidator,
    authMiddleWare,
    useValidation,
    controller.getTask
  );
  app.post(
    "/task",
    createTaskValidator,
    authMiddleWare,
    useValidation,
    controller.createTask
  );
  app.put(
    "/task",
    updateTaskValidator,
    authMiddleWare,
    useValidation,
    controller.updateTask
  );
  app.delete(
    "/task",
    deleteTaskValidator,
    authMiddleWare,
    useValidation,
    controller.deleteTask
  );
};
module.exports = registerRoutes;
