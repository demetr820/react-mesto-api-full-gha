const { HTTP_STATUS } = require("../utils/consts");

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = HTTP_STATUS.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
