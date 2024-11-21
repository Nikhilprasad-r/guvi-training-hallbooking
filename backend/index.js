import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import cookieParser from "cookie-parser";
import connectDB from "./utils/connectDB.js";
import hallRoutes from "./routes/halls.js";
import corsOptions from "./constants/corsOptions.js";
import message from "./routes/messaging.js";
import path from "path";
import http from "http"; 
import initializeSocket from "./routes/messaging.js";

const app = express();

const staticPath = path.resolve("public");
app.use("/static", express.static(staticPath));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Database connection
connectDB();

// Routes
app.use("/api/auth", auth);
app.use("/api", hallRoutes);
app.use("/api/socket", message);


// const server = http.createServer(app);
// initializeSocket(server);

// Start the server
// server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

