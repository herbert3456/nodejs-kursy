import http from "http";
import { handleRoute } from "./router.js";

const server = http.createServer(handleRoute);    
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});