import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

import { verifyAdmin, verifyToken } from "../middlewares/jwt.middleware.js";


const router = Router();

//https://localhost:3000/api/v1/users/register
router.post("/register", UserController.register);
//https://localhost:3000/api/v1/users/login
router.post("/login", UserController.login);
//https://localhost:3000/api/v1/users/store
router.get("/store", verifyToken, UserController.store);



export default router;

