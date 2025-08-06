import { Types } from "mongoose";
import { Role } from "../user/user.interfaces";

export enum WALLET_STATUS{
    ACTIVE = 'ACTIVE',
    DEACTIVATED = 'DEACTIVATED',
    BLOCKED = 'BLOCKED'
}

export interface CurentUser {
  userId: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

export interface IWallet{
    user: Types.ObjectId,
    balance: number,
    totalCommision: number,
    status: WALLET_STATUS
}