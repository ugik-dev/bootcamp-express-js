class ErrorHandler extends Error {
  constructor(message, status) {
    console.log("Dari class Error ", message);
    // super(message);
    // this.message = message;
    // this.statusCode = statusCode;
    // this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    // this.isOperational = true;
    // Error.captureStackTrace(this, this.constructor);
    super();
    this.message = message;
    this.status = status;
  }
}

module.exports = ErrorHandler;
