import express from "express";
import cors from "cors";
//import taskRoutes from "./routes/taskRouters"
import authRoutes from "./routes/authRoutes"
import taskRoutes from "./routes/taskRouters"

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// app.use("/api/tasks", taskRoutes)
app.use("/api/auth", authRoutes)
app.use("/api", taskRoutes)

export default app;
