import { createServer } from "http";
import { Server } from "socket.io";
import { ServerSocket, ServerIO } from "../../client/src/types/event.types";
import app from "./express";
import { addListeners } from "./listeners";

const httpServer = createServer(app);

export const SERVER_IO: ServerIO = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

SERVER_IO.on("connection", (socket: ServerSocket) => {
  addListeners(socket);
});

export default httpServer;
