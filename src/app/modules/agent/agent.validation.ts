import z from "zod";
import { AgentRequestStatus } from "./agent.interfaces";



// Agent reuqest payload zod schema
export const agentRequestPayloadZodSchema = z.object({
    status: z.nativeEnum(AgentRequestStatus)
})