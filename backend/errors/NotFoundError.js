const { HTTP_STATUS } = require("../utils/consts");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = HTTP_STATUS.NOT_FOUND;
  }
}

module.exports = NotFoundError;
