class authException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
        this.name = this.constructor.name;
        Error.captureStackTrace(this.constructor);
    }
}

export default authException;