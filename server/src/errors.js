/**
 * Typed application errors. The global error handler reads `.statusCode` and
 * `.publicMessage` to build a safe JSON response — internal detail never leaks.
 */
export class ApiError extends Error {
  constructor(statusCode, publicMessage, cause) {
    super(publicMessage);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.publicMessage = publicMessage;
    if (cause) this.cause = cause;
  }
}

export class ValidationError extends ApiError {
  constructor(publicMessage, cause) {
    super(400, publicMessage, cause);
    this.name = 'ValidationError';
  }
}

export class SessionNotFoundError extends ApiError {
  constructor(publicMessage = 'Unknown sessionId. Start a new interview.') {
    super(400, publicMessage);
    this.name = 'SessionNotFoundError';
  }
}

export class ServiceUnavailableError extends ApiError {
  constructor(publicMessage = 'temporarily unavailable, please retry', cause) {
    super(503, publicMessage, cause);
    this.name = 'ServiceUnavailableError';
  }
}
