const httpStatus = require("http-status");
const ApiResponse = require("./api-response");

const errorMiddleware = (err, req, res, next) => {
  const errorContext = [];
  const request = req || {};
  errorContext.push(`method: ${request.method}`);
  errorContext.push(`url: ${request.originalUrl}`);
  errorContext.push(`body: ${JSON.stringify(request.body)}`);
  errorContext.push(`status: ${(err || {}).status}`);
  errorContext.push(`user: ${(request.user || {}).id}`);

  const errContextMessage = errorContext.join(" | ");
  console.log(errContextMessage);
  console.log(Object.keys(err), JSON.stringify(err));
  const errorResponse = new ApiResponse({
    success: false,
    data: null,
    message: err.message ? err.message : "Something went wrong.",
    status: err.status || httpStatus.INTERNAL_SERVER_ERROR,
    errors: err.data || [],
  });

  res.status(err.status).json(errorResponse);
};

module.exports = errorMiddleware;
