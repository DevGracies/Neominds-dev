import { Router } from "express";
import { getUser, getUsers, login, logout, register } from "../controllers/auth.controller.js";
import { validateAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/users", getUsers);
router.get("/user", validateAuth, getUser);

export default router;