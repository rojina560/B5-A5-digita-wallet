import { enVars } from "../config/env"

export const handleZodError = (error: any, errorSources: any) => {
    if(enVars.NODE_ENV === 'development'){
        console.log(error)
    }

    error.issues.forEach((issue: any) => {
        errorSources.push({
            path: issue.path[issue.path.length - 1],
            message: issue.message
        })
    })

    return {
        errorStatusCode: 400,
        errorMessage: 'Zod Validation Error.'
    }
}