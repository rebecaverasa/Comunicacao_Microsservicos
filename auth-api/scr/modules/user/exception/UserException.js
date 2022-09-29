class UserException extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
        this.message = message;
        Error.captureStackTrace(this.constructor);
    }
}

export default UserException;