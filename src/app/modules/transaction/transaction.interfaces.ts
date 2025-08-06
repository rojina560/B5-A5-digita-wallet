import { Types } from "mongoose";

export enum TRANSACTION_TYPES {
    ADD_MONEY = 'ADD_MONEY',
    WITHDRAW_MONEY = 'WITHDRAW_MONEY',
    SEND_MONEY = 'SEND_MONEY',
    CASH_IN = 'CASH_IN',
    CASH_OUT = 'CASH_OUT'
}

export enum TRANSACTION_STATUS {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCLED = 'CANCLED',
    REVERSED = 'REVERSED'
}

export interface ICashIn {
    phone: string,
    amount: number
}

export interface ICashOutPayload {
    agentPhoneNumber: string,
    cashOutAmount: number
}

export interface ITransactionParameters {
    sendMoneyCharge: number,
    cashOutCharge: number,
    agentCommision: number
}

export interface ITransaction {
    user: Types.ObjectId,
    type: TRANSACTION_TYPES,
    status: TRANSACTION_STATUS,
    amount: number,
    totalAmountWithCharge?: number,
    charge?: number,
    agentCommision?: number,
    payraPayGot?: number,
    numberFrom?: string,
    numberTo?: string,
    fee?: number,
    commision?: number
}