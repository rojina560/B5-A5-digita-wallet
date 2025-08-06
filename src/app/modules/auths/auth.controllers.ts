import { NextFunction, Request, Response } from "express"
import statusCodes from 'http-status-codes'
import passport from "passport"
import { catchAsync } from "../../errorHelpers/catchAsync"
import AppError from "../../errorHelpers/appError"
import { createUserTokens } from "../../utils/userTokens"
import { setAuthCookie } from "../../utils/setCookie"
import { sendResponse } from "../../utils/sendResponse"

// Credential login
const credentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
    // throw error if not provided any credential info
    
    if (!email || !password) {
        throw new AppError(statusCodes.BAD_REQUEST, 'Email and password are required.');
    }
    // if (!req.body) {
    //     throw new AppError(statusCodes.NOT_FOUND, 'Request body not found while credential login.')
    // }

    passport.authenticate("local", async (error: any, user: any, info: any) => {

        if (error) {
            return next(new AppError(401, error))
        }

        if (!user) {
            return next(new AppError(401, info.message))
        }

        // user tokens
        const userTokens = createUserTokens(user)

        // Take the rest of the user info without password
        const {password, ...rest} = user.toObject()

        // Set access token or refresh token into cookie
        setAuthCookie(res, userTokens)

        // Send response
        sendResponse(res, {
            statusCode: statusCodes.OK,
            success: true,
            message: 'User Successfully Loged In',
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: rest
            }
        })
    })(req, res, next)
})

export const AuthControllers = {
    credentialLogin
}