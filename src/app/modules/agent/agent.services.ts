import { Request } from "express"
import statusCodes from 'http-status-codes'
import AppError from "../../errorHelpers/appError"
import { HandleAgentPayloadType } from "./agent.interfaces"
import AgentRequest from "./agent.models"


const handleAgentRequest = async(req: Request) => {
    const agentReqId = req.params.id
    const {status}: HandleAgentPayloadType = req.body

    if(!status){
        throw new AppError(statusCodes.BAD_REQUEST, 'Status not available.')
    }

    // find agent Request
    const agentRequest = await AgentRequest.findById(agentReqId)

    if(!agentRequest){
        throw new AppError(statusCodes.NOT_FOUND, 'Agent request not found.')
    }

    // Update agent request status
    const updatedAgentRequestStaus = await AgentRequest.findByIdAndUpdate(agentReqId, {status}, {new: true, runValidators: true})

    return updatedAgentRequestStaus

}

export const AgentRequestServices = {
    handleAgentRequest
}