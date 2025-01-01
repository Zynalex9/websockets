import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin: "http://localhost:5173",
        methods:['GET','POST'],
        credentials:true
    }
});
io.on("connection", (socket) => {
  console.log("New socket-user connected", socket.id);
});

server.listen(3000, () => {
  console.log("server running on port 3000");
});