import mongoose from "mongoose"
import { USER_COLLECTION_NAME } from "./user.model.js"
import { CHANNEL_COLLECTION_NAME } from "./channel.model.js"

const channelMessagesSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
        trim: true
    },
    id_channel:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: CHANNEL_COLLECTION_NAME
    },
    id_user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: USER_COLLECTION_NAME
    }
},
{
    timestamps: true
}    
)

export const CHANNELMESSAGE_COLLECTION_NAME = 'ChannelMessage'
const channelMessagesModel = mongoose.model(CHANNELMESSAGE_COLLECTION_NAME, channelMessagesSchema);
export default channelMessagesModel;