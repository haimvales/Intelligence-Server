import express from "express";
import { addUser, deleteUser, getAllUsers, getPostById, updateUser } from "../ctrls/userC.js";
import { logger } from "../middlewares/logger.js";
import { validateUser } from "../middlewares/auth.js";

const router = express.Router();


router.get("/", logger, getAllUsers);
router.post("/:id/posts", logger, validateUser, getPostById);
router.post("/", logger, addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;