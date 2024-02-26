import { consoleMessageColor } from "./src/data/consoleview.js";
import { httpServer } from "./src/http_server/index.js";
import { startServer } from "./src/ws/server.js";

const HTTP_PORT = 8181;


console.log(consoleMessageColor.serverinfo, `Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
startServer();
