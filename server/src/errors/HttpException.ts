export abstract class HttpException extends Error {
    protected constructor(public message: string, public status: number) {
        super(message);
    }
}