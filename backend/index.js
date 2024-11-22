import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import cookieParser from "cookie-parser";
import hallRoutes from "./routes/halls.js";
import corsOptions from "./constants/corsOptions.js";
import path from 'path';
import { connectMysqlDb } from "./utils/connectMysqlDb.js";

const staticPath=path.resolve("public")
connectMysqlDb()
const app = express();

app.use("/static",express.static(staticPath))

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());



app.use("/api/auth", auth);

app.use("/api", hallRoutes);

// Start the server
app.listen(process.env.PORT, () => console.log("Server running "));
