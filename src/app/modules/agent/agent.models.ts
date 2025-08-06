import {model, Schema} from 'mongoose'
import { AgentRequestStatus } from './agent.interfaces'


// Agent Request schema definition
const agentRequestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        enum: Object.values(AgentRequestStatus),
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: AgentRequestStatus.PENDING
    }
}, {
    timestamps: true,
    versionKey: false,
})

const AgentRequest = model('AgentRequest', agentRequestSchema)

export default AgentRequest