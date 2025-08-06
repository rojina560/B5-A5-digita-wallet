export const handleValidationError = (error: any, errorSources: any) => {
    const errors = Object.values(error.errors)

    errors.forEach((errorObj: any) => {
        errorSources.push({
            path: errorObj.path,
            message: errorObj.message
        })
    })  

     return {
         errorStatusCode : 400,
         errorMessage : "validation Error"
    }
}