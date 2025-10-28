import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import resourceRoutes from "./routes/resourceRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
app.use(express.json());

// Create logs directory if not exists
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

// Use morgan to log HTTP requests to file + console
const accessLogStream = fs.createWriteStream(path.join(logDir, "access.log"), {
  flags: "a",
});

app.use(
  morgan(
    ":remote-addr - :method :url :status :res[content-length] - :response-time ms",
    { stream: accessLogStream }
  )
);
app.use(
  morgan("dev") // also log pretty output to console for dev
);

// Routes
app.use("/api/resources", resourceRoutes);
app.use(errorHandler);

export default app;
