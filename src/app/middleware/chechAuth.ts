import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/appError";
import StatusCodes from "http-status-codes";
import { verifyToken } from "../utils/jwt";
import { enVars } from "../config/env";

import { IsActive } from "../modules/user/user.interfaces";
import User from "../modules/user/user.model";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization

        if (!accessToken) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'Access token not found.')
        }

        // Check if the token is verified
        const verifiedToken = verifyToken(accessToken, enVars.JWT_ACCESS_SECRET)

        // Find the existing user 
        const existingUser = await User.findOne({ email: verifiedToken.email })

        // If user does not exist
        if (!existingUser) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'User does not exist.')
        }

        // // If user is not verified
        // if(!existingUser.isVerified){
        //     throw new AppError(StatusCodes.BAD_REQUEST, 'User is not verified.')
        // }


        // If user is blocked or inactive
        if (existingUser.isActive === IsActive.BLOCKED || existingUser.isActive === IsActive.INACTIVE) {
            throw new AppError(StatusCodes.BAD_REQUEST, `User is ${existingUser.isActive}`)
        }

        // If user is deleted
        if (existingUser.isDateleted) {
            throw new AppError(StatusCodes.BAD_REQUEST, `User is Deleted`)
        }


        // If user is not permitted, means user role does not allow to visit that route
        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(StatusCodes.FORBIDDEN, `You are not permitted to access this route.`)
        }
//         if (authRoles.length > 0 && !authRoles.includes(verifiedToken.role)) {
//     throw new AppError(StatusCodes.FORBIDDEN, `You are not permitted to access this route.`)
// }

        req.user = verifiedToken

        next()


    } catch (error: any) {
        if (enVars.NODE_ENV === 'development') {
            console.log(error)
        }
        next(error)
    }
}