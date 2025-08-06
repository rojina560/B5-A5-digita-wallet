import { Router } from "express";
import { Role } from "./user.interfaces";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middleware/chechAuth";
export const userRouter = Router()

// Register a new user
userRouter.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser);
// Update user
userRouter.patch("/", validateRequest(updateUserZodSchema), checkAuth(...Object.values(Role)), UserControllers.updateUser);
// get all users
userRouter.get("/", checkAuth(Role.ADMIN), UserControllers.getAllUsers);
// get all agents
userRouter.get("/agents", checkAuth(Role.ADMIN), UserControllers.getAllAgents);
// apply to become agent
userRouter.post("/agents/become-agent", checkAuth(Role.USER), UserControllers.becomeAnAgent);