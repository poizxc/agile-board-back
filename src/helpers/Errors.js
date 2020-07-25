class StatusError extends Error {
  _statusCode;

  _userMessage;

  constructor(statusCode, message) {
    super();
    this._statusCode = statusCode;
    this._userMessage = message;
  }

  get statusCode() {
    return this._statusCode;
  }

  get userMessage() {
    return this._userMessage;
  }
}

const errors = {
  badRequest: (message = 'Bad Request') => new StatusError(400, message),
  unauthorized: (message = 'unauthorized') => new StatusError(401, message),
  forbidden: (message = 'forbidden') => new StatusError(403, message),
  notFound: (message = 'Not Found') => new StatusError(404, message),
  conflict: (message = 'Conflict') => new StatusError(409, message),
};

module.exports = { StatusError, errors };
