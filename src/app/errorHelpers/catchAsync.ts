import { NextFunction, Request, Response } from "express";
import { enVars } from "../config/env";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>

export const catchAsync = (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next).catch((error: any) => {
        if(enVars.NODE_ENV === 'development'){
            console.log(error)
        }
        next(error)
    }))
}