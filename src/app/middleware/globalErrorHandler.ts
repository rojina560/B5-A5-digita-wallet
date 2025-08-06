import { NextFunction, Request, Response } from "express";
import { enVars } from "../config/env";
import { TErrorSources } from "../types/error.types";
import { handleDuplicateError } from "../errorHelpers/handleDuplicateError";
import { handleCastError } from "../errorHelpers/handleCastError";
import { handleZodError } from "../errorHelpers/handleZodError";
import AppError from "../errorHelpers/appError";
import { handleValidationError } from "../errorHelpers/handleValidation";

export const globalErrorHandler = async (error: any, req: Request, res: Response, next: NextFunction) => {
    if (enVars.NODE_ENV === 'development') {
        console.log(error)
    }

    const errorSources: TErrorSources[] = []
    let errorStatusCode = 500
    let errorMessage = 'Something went wrong. Internal server error.'

    // Handle duplicate error
    if (error.code === 11000) {
        const duplicateError = handleDuplicateError(error)

        errorStatusCode = duplicateError.errorStatusCode
        errorMessage = duplicateError.errorMessage
    }

    // Handle cast error
    else if (error.name === 'CastError') {
        const castError = handleCastError(error)

        errorStatusCode = castError.errorStatusCode
        errorMessage = castError.errorMessage
    }


    // Handle zod error
    else if (error.name === 'ZodError') {
        const zodError = handleZodError(error, errorSources)

        errorStatusCode = zodError.errorStatusCode
        errorMessage = zodError.errorMessage
    }


    // Handle validation Error
    else if (error.name === "ValidationError") {
        const validationError = handleValidationError(error, errorSources)

        errorStatusCode = validationError.errorStatusCode
        errorMessage = validationError.errorMessage
    }

    // Handle custom App error instance 
    else if(error instanceof AppError){
        errorStatusCode = error.statusCode,
        errorMessage = error.message
    }


    // Handle actual js error
    else if(error instanceof Error){
        errorStatusCode = 500
        errorMessage = error.message
    }

    res.status(errorStatusCode).json({
        success: false,
        message: errorMessage,
        error: enVars.NODE_ENV === 'development' ? 
            {
                name: error.name,
                message: error.message,
                errorSources,
                issues: error.issues
            }
        : null,
        stack: enVars.NODE_ENV === 'development' ? error.stack : null
    })

    
}