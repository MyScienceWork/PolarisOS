function GenericException(name, error, status, path) {
    Error.call(this, error.message);
    Error.captureStackTrace(this, this.constructor);
    this.name = name;
    this.message = error.message;
    this.status = status || 500;
    this.path = path || null;
    this.inner = error;
    this.error = true;
}
GenericException.prototype = Object.create(Error.prototype);
GenericException.prototype.constructor = GenericException;

module.exports = GenericException;
