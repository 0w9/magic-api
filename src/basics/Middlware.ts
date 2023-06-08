import { IncomingMessage, ServerResponse } from "http";
import { Response } from "./Response";

export class Middleware {
    nextStatus: string;

    resolve?: (value?: any) => void;
    reject?: (reason?: any) => void;

    callbackFunction: (req: IncomingMessage, res: Response, next: any) => any;

    constructor(callbackFunction: (req: IncomingMessage, res: Response, next: any) => any) {
        this.callbackFunction = callbackFunction
        this.resolve = this.next
        this.nextStatus = "Running"
    }

    next(value?: any) {
       
    }

    async callback(
        req: IncomingMessage,
        res: Response,
    ): Promise<any> {
        return new Promise(resolve => {
            this.resolve = resolve
            this.callbackFunction(req, res, this.next)

            //this.next("yoyo")
        })
    } 
}

export interface MiddlewareInterface extends Middleware {
    callbackFunction: (req: IncomingMessage, res: Response, next: any) => any;
}
