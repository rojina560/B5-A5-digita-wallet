import { enVars } from "../config/env";
import { IUser } from "../modules/user/user.interfaces";
import { generateToken } from "./jwt";

export const createUserTokens = (user: Partial<IUser>) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    }

    // Generate access token
    const accessToken = generateToken(
        jwtPayload,
        enVars.JWT_ACCESS_SECRET,
        enVars.JWT_ACCESS_EXPIRES
    )

    // Generate refresh token
    const refreshToken = generateToken(
        jwtPayload,
        enVars.JWT_REFRESH_SECRET,
        enVars.JWT_REFRESH_EXPIRES
    )



    return {
        accessToken,
        refreshToken
    }
}