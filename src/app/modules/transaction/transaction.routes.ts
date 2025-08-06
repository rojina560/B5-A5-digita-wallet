import { Router } from "express";
import { Role } from "../user/user.interfaces";
import { addMoneyZodSchema, cashInZodSchema, cashOutZodSchema, sendMoneyZodSchema, transactionParameterCreationZodSchema, transactionParameterUpdateZodSchema, withDrawMoneyZodSchema } from "./transaction.validation";
import { validateRequest } from "../../middleware/validateRequest";
import { TransactionControllers } from "./transaction.controller";
import { checkAuth } from "../../middleware/chechAuth";


export const transactionRouter = Router()

// Add money to wallet
transactionRouter.post('/add-money', validateRequest(addMoneyZodSchema), checkAuth(...Object.values(Role)), TransactionControllers.addMoneyToWallet)

// Withdraw money from wallet
transactionRouter.post('/withdraw-money', validateRequest(withDrawMoneyZodSchema), checkAuth(...Object.values(Role)), TransactionControllers.withdrawMoneyFromWallet)

// Send money to another wallet
transactionRouter.post('/send-money', validateRequest(sendMoneyZodSchema), checkAuth(...Object.values(Role)), TransactionControllers.sendMoneyToAnotherWallet)

// view all transaction history
transactionRouter.get('/history', checkAuth(...Object.values(Role)), TransactionControllers.getAllTransactionHistory)

// Cash in to any user wallet by agent only
transactionRouter.post('/cash-in', validateRequest(cashInZodSchema), checkAuth(Role.AGENT), TransactionControllers.cashIn)

// Cash out from any user wallet by agent only
transactionRouter.post('/cash-out', validateRequest(cashOutZodSchema), checkAuth(Role.USER), TransactionControllers.cashOut)

// Get all transactions
transactionRouter.get('/', checkAuth(Role.ADMIN), TransactionControllers.getAllTransactions)

// Set transaction parameters
transactionRouter.post('/parameters/create', checkAuth(Role.ADMIN), validateRequest(transactionParameterCreationZodSchema), TransactionControllers.createTransactionParameters)

transactionRouter.patch('/parameters/update', checkAuth(Role.ADMIN), validateRequest(transactionParameterUpdateZodSchema), TransactionControllers.updateTransactionParameters)

