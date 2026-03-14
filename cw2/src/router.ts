import http, { IncomingMessage, ServerResponse } from "http";

export const handleRoute = (req:IncomingMessage, res:ServerResponse) => {
res.writeHead(200, { "Content-Type": "text/plain" });
res.end("Hello World suko!");

}
