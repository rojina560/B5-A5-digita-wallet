import { Router } from "express";
import { Role } from "../user/user.interfaces";
import { validateRequest } from "../../middleware/validateRequest";
import { agentRequestPayloadZodSchema } from "./agent.validation";
import { checkAuth } from "../../middleware/chechAuth";
import { AgentRequestControllers } from "./agent.controllers";

export const agentRequestRouter = Router()

// Handle agent request
agentRequestRouter.patch("/handle-request/:id", validateRequest(agentRequestPayloadZodSchema), checkAuth(Role.ADMIN), AgentRequestControllers.handleAgentRequest);