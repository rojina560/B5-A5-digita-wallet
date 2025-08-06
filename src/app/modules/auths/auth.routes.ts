import { Router } from "express";
import { AuthControllers } from "./auth.controllers";

export const authRouter = Router()

// Login
authRouter.post('/login', AuthControllers.credentialLogin)