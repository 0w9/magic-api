import { IncomingMessage, ServerResponse } from "http";
import { Response } from "./Response";
import { Request } from "../handleRequests";

/**
 * A Middlware is a function that is called before a request is processed.  
 * It can be used to modify the request or response or to do things like logging and authentication.
 * 
 * @param callback The callback function to be executed.
 * @returns {Promise<any>}
 */
export class Middleware {
    nextStatus: string;

    resolve?: (value?: any) => void;
    reject?: (reason?: any) => void;

    
    callbackFunction: (req: Request, res: Response, next: any) => any;
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
            this.callbackFunction(new Request(req), res, this.next)

            //this.next("yoyo")
        })
    } 
}

export interface MiddlewareInterface extends Middleware {
    callbackFunction: (req: IncomingMessage, res: Response, next: any) => any;
}
