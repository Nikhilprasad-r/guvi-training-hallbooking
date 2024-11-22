import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import cookieParser from "cookie-parser";
import hallRoutes from "./routes/halls.js";
import corsOptions from "./constants/corsOptions.js";
import path from "path";
import { connectMysqlDb } from "./utils/connectMysqlDb.js";
import http from "http"; // HTTP server
import { Server } from "socket.io"; // Socket.IO server
import setupSocket from "./utils/socketIoHelper.js";

const staticPath = path.resolve("public");
connectMysqlDb();

const app = express();
const server = http.createServer(app); // Create an HTTP server for Express and Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust origin for your setup
    methods: ["GET", "POST"],
  },
});

// Attach the Socket.IO logic
setupSocket(io);

app.use("/static", express.static(staticPath));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", auth);
app.use("/api", hallRoutes);

// Start the server
const PORT = process.env.PORT || 8000; 
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
