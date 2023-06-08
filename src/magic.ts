import Spell from "./router"
import http from "http"
import { yellow, bold, underline, italic } from "colorette"
import handleRequests, { Request } from "./handleRequests";
import { Response, Middleware } from "./basics/";
import { MiddlewareInterface } from "./basics/Middlware";
import handleRequest from "./handleRequests";

/**
 * The MagicServer handles all requests, routes, etc.
 * 
 * @param {number} port The port to listen on.
 * @param {http.Server} server The HTTP server instance. Created automatically.
 * @param {Spell[]} routes The routes to register.
 * @returns {MagicServer} 
 */
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
                new Request(req),
                new Response(req),
                this.routes!,
                this.middlewares!
            )
        )
        this.port = 8080
    }


    
    /**
     * Listens on the given port and starts the server.
     *
     * @param {number} port - The port number to listen on.
     */
    listen(port: number) {
        this.port = port
        this.server!.listen(port)

        console.log(italic(yellow("\n\n✨     " + bold("Magic Server is listening on port " + this.port + "!\n")) + "\n       Your helpers are listening...\n\n")
        )
    }

    /**
     * Registers the given list of Spell routes.
     *
     * @param {Spell[]} routes - The list of Spell routes to be registered.
     */
    registerRoutes(routes: Spell[]) {
        this.routes = routes
    }

    /**
     * Adds a middleware function to the list of middlewares to be executed in the request-response cycle.
     *
     * @param {function} callback - The middleware function to be added.
     */
    use(callback: (req: Request, res: Response, next: any) => any) {
        this.middlewares.push(new Middleware(callback))
    }
}

/**
 * Creates a new MagicServer.
 * @returns {MagicServer} A new instance of MagicServer
 */
export function createMagic(): MagicServer {
    return new MagicServer()
}
