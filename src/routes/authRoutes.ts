//--------------------------- USER LOGIN ROUTER
// Imports
import  express from "express";
import { createUser, fetchUserLogin } from "../controllers/authController";

const router = express.Router();

//------- Routes

// Creates a user
router.post("/users/register", createUser);

//Load specific user
router.post("/users/login", fetchUserLogin);

// Update user info
// router.patch("users/:id", updateUser);
// router.put("users/:id", updateAllUser);

// // Delete user information
// router.delete("/users/id:", deleteUser);

// Exporting auth routes
export default router