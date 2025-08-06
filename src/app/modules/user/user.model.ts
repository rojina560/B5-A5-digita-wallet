import {model, Schema} from 'mongoose'
import { IsActive, Provider, Role } from './user.interfaces'

// Auth provider schema definition
const authProviderSchema = new Schema({
    provider: {
        type: String,
        enum: Object.values(Provider),
        required: true,
    },
    providerId: {
        type: String,
        required: true,
    }
}, {
    timestamps: false,
    _id: false,
    versionKey: false,
})

// User schema definition
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    picture: {
        type: String,
    },
    address: {
        type: String,
    },
    isDateleted: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: String,
        enum: Object.values(IsActive),
        default: IsActive.ACTIVE,
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    auths: [authProviderSchema]
}, {
    timestamps: true,
    versionKey: false,
})

const User = model('User', userSchema)

export default User