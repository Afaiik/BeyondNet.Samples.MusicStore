import CustomError from "./custom.error";
declare class NotAuthorizeError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
export default NotAuthorizeError;
