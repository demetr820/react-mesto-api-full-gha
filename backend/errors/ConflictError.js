const { HTTP_STATUS } = require("../utils/consts");

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = HTTP_STATUS.ALREADY_EXISTS;
  }
}

module.exports = ConflictError;
