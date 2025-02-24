//--------------------------- USER task ROUTER
// Imports
import  express from "express";
import { createTask, deleteTask, getTasks, updateTaskStatus } from "../controllers/taskController";
import { authenticateJWT } from "../middleware/authMiddelware";


const router = express.Router();

//------- Routes

// Creates a new task
router.post("/tasks", authenticateJWT as any, createTask);

// Load all tasks
router.get("/tasks", authenticateJWT as any, getTasks);

// Update users task
// router.patch("tasks/:id")
// router.put("tasks/assign", authenticateJWT, assignTaskToUser);
router.put("/tasks/:id", authenticateJWT as any, updateTaskStatus);

// Delete users task
// router.delete("/tasks/id:")
router.delete("/tasks/:id", authenticateJWT as any, deleteTask)

// Exporting auth routes
export default router