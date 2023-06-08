import { IncomingMessage } from "http";  
import { Response, } from "./basics/"; 
import Router from "./router";
import { MiddlewareInterface } from "./basics/Middlware";

/**
 * A Request is a wrapper around an IncomingMessage. It's the data recieved when a request is made to the server.
 * 
 * @param {IncomingMessage} req The HTTP request
 * @param {string[]} params The params of the request's route, like /api/users/:id would have params of ["id"].
 * @returns {Promise<any>} Promise resolved.
 */
export class Request extends IncomingMessage {
    params: string[];

    constructor(req: Request) {
        super(req.socket);
        this.params = req.url!.split("/").filter((param) => param !== "")
    }
}

/**
 * The handler of the server. It is the function that is called when a request is made to the server and handles 
 * the request. It parses the request and calls the registered middlewares, after that it calls the registered
 * route bound to the request's path.
 * 
 * @param {Request} req The HTTP request
 * @param {Response} res The HTTP response
 * @param {Router[]} routers The list of routers
 * @param {MiddlewareInterface[]} middlewares The list of middlewares
 */
export default function handleRequest(
    req: Request,
    res: Response, 
    routers: Router[],
    middlewares: MiddlewareInterface[]
) {

    for(const middleware of middlewares) {
        middleware.callback(req, res).then(middlwareResponse => {
            console.log(middlwareResponse)
            return;
        }) 
    }

    const router = routers.find(
        (router) => router.path.includes(req.url!.split("/")[1])
    )

    const routerParams = router!.params
    const givenPrams = req.url?.split("/").filter((param) => param !== "")

    routerParams!.forEach((param, index) => {
        req.params!.push(givenPrams![index])
    })

    if (!router) {
        res.statusCode = 404
        res.end("Not found")
        return () => {}
    }
    
    if(!router.post) {
        res.statusCode = 404
        res.end("Not found")
    } else if(!router.get) {
        res.statusCode = 404
        res.end("Not found")
    } else {
        if(req.method === "POST") {

            console.log(req.params)
            router.postCallback!(req, res)
        } else if(req.method === "GET") {
            router.getCallback!(req, res)
        }
    }

    return () => {
        
    }
}