import { IncomingMessage, ServerResponse } from "http";
import { Response } from "./basics/Response"; 
import { Request } from "./handleRequests";
/**
 * A "Spell" is what you need for the "Magic" server. It's defining a POST and GET route.
 * 
 * @param path The path of the route.
 * @param postCallback The callback for the POST route.
 * @param getCallback The callback for the GET route.
 * @returns {Spell}
 * 
 * @example
 * const router = new Spell("/api")
 * router.post(
 *     (req, res) => {
 *         console.log(italic("✨     " + ("New POST IncomingMessage: " + req.url)))
 *         res.statusCode = 200
 *         res.end(JSON.stringify({
 *             message: "You made it ✨"
 *         }))
 *     }
 * )
 * router.get(
 *     (req, res) => {
 *         console.log(italic("\n\n✨     " + ("New GET IncomingMessage: " + req.url)))
 *     }
 * )
 * 
 */

export default class Spell {
    path: string;
    params: string[];

    postCallback?: (
        req: Request,
        res: Response
    ) => void;
    getCallback?: (
        req: Request,
        res: Response
    ) => void;

    constructor(path: string) {
        this.path = path;
        this.postCallback = undefined;
        this.getCallback = undefined;
        this.params = this.path.split("/");

        this.params = this.params.filter(
            (param) => param !== ""
        )

        this.params.forEach(
            (param, index) => {
                this.params[index] = param.toLowerCase();
                this.params[index] = param.replace("*", "");
            }
        )
    }

    /**
     * The POST route of the spell.
     * @param callback The callback for the POST route.
     **/     
    post(
        callback :(
            req: Request,
            res: Response
        ) => void) 
    {
        this.postCallback = callback;
    }

        
    /**
     * The GET route of the spell.
     * @param callback The callback for the POST route.
     **/   

    get(
        callback: (
            req: any,
            res: any
        ) => void) 
        
    {
        this.getCallback = callback;
    }
}