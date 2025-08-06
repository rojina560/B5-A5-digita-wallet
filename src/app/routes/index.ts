import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";
import { authRouter } from "../modules/auths/auth.routes";
import { transactionRouter } from "../modules/transaction/transaction.routes";
import { walletRouter } from "../modules/wallet/wallet.routes";
import { agentRequestRouter } from "../modules/agent/agent.routes";


export const router = Router()

const moduleRoutes = [
    {
        path: '/user',
        route: userRouter,
    },
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/transaction',
        route: transactionRouter
    },
    {
        path: '/wallet',
        route: walletRouter
    },
    {
        path: '/agent-request',
        route: agentRequestRouter
    }
]

moduleRoutes.forEach((route) => 
    router.use(route.path, route.route)
)