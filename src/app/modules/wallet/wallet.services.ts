import { Request } from "express";
import StatusCodes from "http-status-codes";
import { CurentUser, WALLET_STATUS } from "./wallet.interfaces";
import Wallet from "./wallet.model";
import AppError from "../../errorHelpers/appError";
import User from "../user/user.model";



// get all wallets
const getAllWallets = async () => {
    const wallets = await Wallet.find()
    return wallets
}

// block a wallet
const blockWallet = async(req: Request) => {
    const walletId = req.params.id

    // If wallet id not available
    if(!walletId){
        throw new AppError(StatusCodes.NOT_FOUND, 'Wallet id not found.')
    }

    const wallet = await Wallet.findById(walletId)

    // If wallet not available
    if(!wallet){
        throw new AppError(StatusCodes.NOT_FOUND, 'Wallet not found.')
    }

    // If wallet status is already blocked or deactivated
    if(wallet.status === WALLET_STATUS.BLOCKED || wallet.status === WALLET_STATUS.DEACTIVATED){
        throw new AppError(StatusCodes.BAD_REQUEST, `Wallet is already ${wallet.status}`)
    }

    // Update wallet status
    const updatedWallet = await Wallet.findByIdAndUpdate(walletId, {status: WALLET_STATUS.BLOCKED}, {new: true, runValidators: true})

    return updatedWallet
}


// Unblock a wallet
const unblockWallet = async(req: Request) => {
    const walletId = req.params.id

    // If wallet id not available
    if(!walletId){
        throw new AppError(StatusCodes.NOT_FOUND, 'Wallet id not found.')
    }

    const wallet = await Wallet.findById(walletId)

    // If wallet not available
    if(!wallet){
        throw new AppError(StatusCodes.NOT_FOUND, 'Wallet not found.')
    }

    // If wallet status is already blocked or deactivated
    if(wallet.status === WALLET_STATUS.ACTIVE){
        throw new AppError(StatusCodes.BAD_REQUEST, `Wallet is already ${wallet.status}`)
    }

    // Update wallet status
    const updatedWallet = await Wallet.findByIdAndUpdate(walletId, {status: WALLET_STATUS.ACTIVE}, {new: true, runValidators: true})

    return updatedWallet
}



// Deactivate own wallet
const deactivateOwnWallet = async(currentUser: CurentUser) => {

    const logedInUser = await User.findById(currentUser.userId)

    // If logedIn user not available
    if(!logedInUser){
        throw new AppError(StatusCodes.NOT_FOUND, 'Logged in user not found.')
    }

    // find loged in user wallet
    const loggedInUserWallet = await Wallet.findOne({user: currentUser.userId})

    // If wallet not available
    if(!loggedInUserWallet){
        throw new AppError(StatusCodes.NOT_FOUND, 'Wallet not found.')
    }

    // If wallet is blocked by admin
    if(loggedInUserWallet.status === WALLET_STATUS.BLOCKED){
        throw new AppError(StatusCodes.BAD_REQUEST, `Sorry, You can not deactivate. Your wallet is blocked.`)
    }

    // If wallet status is already deactivated
    if(loggedInUserWallet.status === WALLET_STATUS.DEACTIVATED){
        throw new AppError(StatusCodes.BAD_REQUEST, `Wallet is already Deactivated`)
    }

    // Update wallet status
    const updatedWallet = await Wallet.findByIdAndUpdate(loggedInUserWallet._id, {status: WALLET_STATUS.DEACTIVATED}, {new: true, runValidators: true})

    return updatedWallet
}




// Activate own wallet
const activateOwnWallet = async(currentUser: CurentUser) => {
    const logedInUser = await User.findById(currentUser.userId)

    // If logedIn user not available
    if(!logedInUser){
        throw new AppError(StatusCodes.NOT_FOUND, 'Logged in user not found.')
    }

    // find loged in user wallet
    const loggedInUserWallet = await Wallet.findOne({user: currentUser.userId})

    // If wallet not available
    if(!loggedInUserWallet){
        throw new AppError(StatusCodes.NOT_FOUND, 'Wallet not found.')
    }

    // If wallet is blocked by admin
    if(loggedInUserWallet.status === WALLET_STATUS.BLOCKED){
        throw new AppError(StatusCodes.BAD_REQUEST, `Sorry, You can not activate your wallet. Your wallet is blocked.`)
    }

    // If wallet status is already active
    if(loggedInUserWallet.status === WALLET_STATUS.ACTIVE){
        throw new AppError(StatusCodes.BAD_REQUEST, `Wallet is already Active`)
    }

    // Update wallet status
    const updatedWallet = await Wallet.findByIdAndUpdate(loggedInUserWallet._id, {status: WALLET_STATUS.ACTIVE}, {new: true, runValidators: true})

    return updatedWallet
}


export const WalletServices = {
    getAllWallets,
    blockWallet,
    unblockWallet,
    deactivateOwnWallet,
    activateOwnWallet
}