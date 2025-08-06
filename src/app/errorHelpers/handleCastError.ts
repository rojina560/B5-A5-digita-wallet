import mongoose from "mongoose"
import { enVars } from "../config/env"

export const handleCastError = (error: mongoose.CastError) => {
    if(enVars.NODE_ENV === 'development'){
        console.log(error)
    }
    return {
        errorStatusCode: 400,
        errorMessage: 'Invalid Object id'
    }
}