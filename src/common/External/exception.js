export class AuthRequiredError extends Error {
  constructor(message = 'Authentication is required to access this resource.') {
    super(message);
    this.name = 'AuthRequiredError';
    this.statusCode = 401; // HTTP status code for Unauthorized
  }
}

export class ServerError extends Error {
  constructor(message = 'An unexpected error occurred on the server.') {
    super(message);
    this.name = 'Internal Server Error';
    this.statusCode = 500; // HTTP status code for Internal Server Error
  }
}