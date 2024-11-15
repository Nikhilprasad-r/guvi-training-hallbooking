import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import cookieParser from "cookie-parser";
import connectDB from "./utils/connectDB.js";
import hallRoutes from "./routes/halls.js";
import corsOptions from "./constants/corsOptions.js";



const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/auth", auth);

app.use("/api", hallRoutes);

// Start the server
app.listen(process.env.PORT, () => console.log("Server running "));
