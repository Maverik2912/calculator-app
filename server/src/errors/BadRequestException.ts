import {HttpException} from "./HttpException";

export class BadRequestException extends HttpException{
    constructor(public message: string, public status: number = 400) {
        super(message, status);
    }
}