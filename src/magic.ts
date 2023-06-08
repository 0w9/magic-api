import Spell from "./router"
import http from "http"
import { yellow, bold, underline, italic } from "colorette"
import handleRequests, { Request } from "./handleRequests";
import { Response, Middleware } from "./basics/";
import { MiddlewareInterface } from "./basics/Middlware";
import handleRequest from "./handleRequests";

class MagicServer {
    port?: number
    server?: http.Server
    routes?: Spell[] = []
    middlewares: MiddlewareInterface[] = []
    middlewareIndex = 0
    currentMiddleware: any = null

    constructor() {
        this.server = http.createServer

        (
            (req, res) => handleRequest(
                req,
                new Response(req),
                this.routes!,
                this.middlewares!
            )
        )
        this.port = 8080
    }


    listen(port: number) {
        this.port = port
        this.server!.listen(port)

        console.log(italic(yellow("\n\n✨     " + bold("Magic Server is listening on port " + this.port + "!\n")) + "\n       Your helpers are listening...\n\n")
        )
    }

    registerRoutes(routes: Spell[]) {
        this.routes = routes
    }

    use(callback: (req: Request, res: Response, next: any) => any) {
        this.middlewares.push(new Middleware(callback))
    }
}

export function createMagic() {
    return new MagicServer()
}
