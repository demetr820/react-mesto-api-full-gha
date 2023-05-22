const { HTTP_STATUS } = require("../utils/consts");

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = HTTP_STATUS.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
