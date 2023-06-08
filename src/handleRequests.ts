import { IncomingMessage, ServerResponse } from "http";  
import { Response, Middleware } from "./basics/"; 
import Router from "./router";
import { MiddlewareInterface } from "./basics/Middlware";

export interface Request extends IncomingMessage {
    params: string[];

    
}

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