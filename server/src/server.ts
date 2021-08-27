import { createServer } from "http";
import { Server } from "socket.io";
import { ServerSocket, ServerIO } from "../../client/src/types/event.types";
import app from "./express";
import { addGameListeners } from "./game/listeners";
import { addPlayerListeners } from "./player/listeners";

const httpServer = createServer(app);
const io: ServerIO = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: ServerSocket) => {
  addGameListeners(socket, io);
  addPlayerListeners(socket, io);
});

export default httpServer;
