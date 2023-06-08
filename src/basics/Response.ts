import { IncomingMessage, ServerResponse } from "http";

export class Response extends ServerResponse {
    constructor(req: IncomingMessage) {
        super(req);
    }

    json(body: object) {
        this.end(JSON.stringify(body));
    }

    status(code: number) {
        this.statusCode = code
    }

    redirect(url: string) {
        this.statusCode = 302
        this.setHeader("Location", url)
        this.end()
    }
}