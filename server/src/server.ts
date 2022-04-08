import { createServer } from "http";
import { Server } from "socket.io";
import { ServerSocket, ServerIO } from "../../client/src/types/event.types";
import app from "./express";
import { addGameListeners } from "./game/listeners";
import { addPlayerListeners } from "./player/listeners";

const httpServer = createServer(app);
export const SERVER_IO: ServerIO = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

SERVER_IO.on("connection", (socket: ServerSocket) => {
  addGameListeners(socket, SERVER_IO);
  addPlayerListeners(socket, SERVER_IO);
});

export default httpServer;
