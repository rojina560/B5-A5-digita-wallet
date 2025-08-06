import { NextFunction, Request, Response } from "express"

import statusCodes from 'http-status-codes'
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../errorHelpers/catchAsync"
import { AgentRequestServices } from "./agent.services"

// Handle agent request
export const handleAgentRequest = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await AgentRequestServices.handleAgentRequest(req)

    sendResponse(res, {
        statusCode: statusCodes.OK,
        success: true,
        message: 'Agent Request updated.',
        data: result
    })
})


export const AgentRequestControllers = {
    handleAgentRequest
}