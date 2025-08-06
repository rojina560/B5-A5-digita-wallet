import { model, Schema } from "mongoose";
import { WALLET_STATUS } from "./wallet.interfaces";

// Define wallet model
const walletSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 50
    },
    totalCommision: {
        type: Number,
    },
    status: {
        type: String,
        enum: Object.values(WALLET_STATUS),
        default: WALLET_STATUS.ACTIVE
    }
}, {
    timestamps: true,
    versionKey: false
})

const Wallet = model('Wallet', walletSchema)
export default Wallet