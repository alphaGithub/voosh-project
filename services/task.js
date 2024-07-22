const { TASK_STATUS } = require("../constants");
const { BaseError } = require("../core/baseError");
const { mongoDb } = require("../database/mongodb");

class TaskService {
  constructor() {}
  getTask = async (userId, filter, limit = null, offset = 0) => {
    try {
      const taskFilter = { userId };
      if (filter.status) taskFilter.status = filter.status;
      console.log(taskFilter);
      const tasks = await mongoDb.Task.find(taskFilter)
        .skip(offset)
        .limit(limit);
      return tasks?.map((item) => {
        return {
          id: item._id,
          name: item.name,
          description: item.description,
          status: item.status,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
    } catch (error) {
      console.log("erroor", error);
      throw new BaseError(`error in fetching task`, error);
    }
  };
  createTask = async (
    userId,
    { name, description, status = TASK_STATUS.PENDING }
  ) => {
    try {
      console.log({ userId, name, description, status });
      return await mongoDb.Task.create({ userId, name, description, status });
    } catch (error) {
      throw new BaseError(`error in creating task`, error);
    }
  };
  updateTask = async (userId, taskId, payload) => {
    try {
      console.log(userId, taskId, payload);
      return await mongoDb.Task.updateOne({ userId, _id: taskId }, payload);
    } catch (error) {
      throw new BaseError(`error in updating task`, error);
    }
  };
  deleteTask = async (userId, taskId) => {
    try {
      console.log({ userId, _id: taskId });
      return await mongoDb.Task.deleteOne({ userId, _id: taskId });
    } catch (error) {
      throw new BaseError(`error in deleting task`, error);
    }
  };
}
module.exports = TaskService;
