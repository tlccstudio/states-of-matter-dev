import settings from "settings";
import {httpServer, ioServer} from "apis/server";
import {requests} from "requests";

process.on("unhandledRejection", (reason, promise): void => {
  console.log(`Unhandled rejection: ${reason}`);
});

process.on("uncaughtException", (error, origin): void => {
  console.log(`Uncaught Exception: ${error}`);
});

ioServer.on("connection", (socket): void => {
  console.log("Connected");
  requests.forEach((request): void => {
    request(socket);
  });
});

httpServer.listen(settings.server.port);
