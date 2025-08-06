import dotenv from 'dotenv';
dotenv.config();

interface EnvConfig {
    PORT: string,
    NODE_ENV: string,
    SALT_ROUND: string,
    MONGODB_URI: string,
    JWT_ACCESS_SECRET: string,
    JWT_ACCESS_EXPIRES: string,
    JWT_REFRESH_SECRET: string,
    JWT_REFRESH_EXPIRES: string
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = ['PORT', 'NODE_ENV', 'SALT_ROUND', 'MONGODB_URI', 'JWT_ACCESS_SECRET', 'JWT_ACCESS_EXPIRES', 'JWT_REFRESH_SECRET', 'JWT_REFRESH_EXPIRES']

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        NODE_ENV: process.env.NODE_ENV as string,
        SALT_ROUND: process.env.SALT_ROUND as string,
        MONGODB_URI: process.env.MONGODB_URI as string,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
    }
}

export const enVars = loadEnvVariables()