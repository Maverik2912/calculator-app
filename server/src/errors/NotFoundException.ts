import {HttpException} from "./HttpException";
import {textMessages} from "@texts";

export class NotFoundException extends HttpException{
    constructor(public message: string = textMessages.error.NOT_FOUND, public status: number = 404) {
        super(message, status);
    }
}