class BaseError extends Error {
  constructor(message, data = null, status = 400) {
    super(message);
    console.log(".....data", data);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.data = data;
    Error.captureStackTrace(this);
  }
}

module.exports = { BaseError };
