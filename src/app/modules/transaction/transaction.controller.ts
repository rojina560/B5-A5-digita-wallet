import { NextFunction, Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken"
import StatusCodes from 'http-status-codes'
import { TransactionServices } from "./transaction.services"
import { catchAsync } from "../../errorHelpers/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import AppError from "../../errorHelpers/appError"

// Get all transactions
const getAllTransactions = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query as Record<string, string>
    const result = await TransactionServices.getAllTransactions(query)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Successfully retrived all transactions.',
        data: result.transactions,
        meta: result.meta
    })
})

// Add money to wallet
const addMoneyToWallet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const decodedToken = req.user

    const result = await TransactionServices.addMoneyToWallet(req, payload, decodedToken as JwtPayload)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Money added to wallet.',
        data: result
    })
})

// Withdraw money from wallet
const withdrawMoneyFromWallet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const decodedToken = req.user

    const result = await TransactionServices.withdrawMoneyFromWallet(req, payload, decodedToken as JwtPayload)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Successfully withdraw money from wallet.',
        data: result
    })
})


// send money to another wallet
const sendMoneyToAnotherWallet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const decodedToken = req.user

    const result = await TransactionServices.sendMoneyToAnotherWallet(req, payload, decodedToken as JwtPayload)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Successfully send money to another wallet.',
        data: result
    })
})


// Get all transaction history
const getAllTransactionHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User is not available.')
    }

    const decodedToken = req.user

    const result = await TransactionServices.getAllTransactionHistory(req, decodedToken as JwtPayload)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Users transaction history retrived successfully.',
        data: result
    })
})


// Cash in to any user wallet by an agent only
const cashIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const decodedToken = req.user

    const result = await TransactionServices.cashIn(req.body, decodedToken as JwtPayload)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Cash in successfull.',
        data: result
    })
})


// Cash out from any user wallet by an agent only
const cashOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const decodedToken = req.user

    const result = await TransactionServices.cashOut(req.body, decodedToken as JwtPayload)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Cash out successfull.',
        data: result
    })
})


// Set transacton parameters
const createTransactionParameters = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await TransactionServices.createTransactionParameters(req.body)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Transaction parameter crated successfully.',
        data: result
    })
})


// update transacton parameters
const updateTransactionParameters = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await TransactionServices.updateTransactionParameter(req.body)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Transaction parameter updated successfully.',
        data: result
    })
})


export const TransactionControllers = {
    addMoneyToWallet,
    withdrawMoneyFromWallet,
    sendMoneyToAnotherWallet,
    getAllTransactionHistory,
    cashIn,
    cashOut,
    getAllTransactions,
    createTransactionParameters,
    updateTransactionParameters
}