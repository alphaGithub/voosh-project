const { response } = require("express");
const ApiResponse = require("../core/api-response");
const { getJWTToken } = require("../core/jwt-handler");
const LoginService = require("../services/login");
const TaskService = require("../services/task");

class Controller {
  constructor() {
    this.loginService = new LoginService();
    this.taskService = new TaskService();
  }
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userDetails = await this.loginService.login({ email, password });
      const token = getJWTToken(userDetails);
      res.cookie("user", token);
      const response = new ApiResponse({
        success: !!userDetails,
        data: userDetails,
        message: "login success!",
      });
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };
  getUser = async (req, res, next) => {
    try {
      const { id } = req.user;
      const userDetails = await this.loginService.getUser(id);
      const response = new ApiResponse({
        success: !!userDetails,
        data: userDetails,
        message: "user fetched success!",
      });
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };
  signUp = async (req, res, next) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      const userDetails = await this.loginService.signUp({
        email,
        password,
        firstName,
        lastName,
      });
      const response = new ApiResponse({
        success: !!userDetails,
        data: userDetails,
        message: "signUp success!",
      });
      const token = getJWTToken(userDetails);
      res.cookie("user", token);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };
  getTask = async (req, res, next) => {
    try {
      const { status } = req.query;
      const { id } = req.user;
      const result = await this.taskService.getTask(id, { status });
      const response = new ApiResponse({
        success: !!result,
        data: result,
        message: "task fetched success!",
      });
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };
  createTask = async (req, res, next) => {
    try {
      const { name, description, status } = req.body;
      const { id } = req.user;
      const result = await this.taskService.createTask(id, {
        name,
        description,
        status,
      });
      const response = new ApiResponse({
        success: !!result,
        data: result,
        message: "task created success!",
      });
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };
  updateTask = async (req, res, next) => {
    try {
      const {
        id: taskId,
        name = null,
        description = null,
        status = null,
      } = req.body;
      const { id } = req.user;
      const payload = {};
      if (name) payload.name = name;
      if (description) payload.description = description;
      if (status) payload.status = status;
      const result = await this.taskService.updateTask(id, taskId, payload);
      const response = new ApiResponse({
        success: !!result,
        data: result,
        message: "task update success!",
      });
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };
  deleteTask = async (req, res, next) => {
    try {
      const { id: taskId } = req.body;
      const { id } = req.user;
      const result = await this.taskService.deleteTask(id, taskId);
      const response = new ApiResponse({
        success: !!result,
        data: result,
        message: "task deleted success!",
      });
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };
}
module.exports = Controller;
