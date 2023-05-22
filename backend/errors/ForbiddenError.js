const { HTTP_STATUS } = require("../utils/consts");

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = HTTP_STATUS.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
