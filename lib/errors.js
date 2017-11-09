const http = require('http');

class HttpError extends Error {
    constructor(status, message) {
        super(status, message);

        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }

        this.status = status;
        this.message = message || http.STATUS_CODES[status] || 'Error';
    }
}

module.exports.HttpError = HttpError;
