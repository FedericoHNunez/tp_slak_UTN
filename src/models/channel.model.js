import mongoose from "mongoose";
import { WORKSPACE_COLLECTION_NAME } from "./workspace.model.js";

const channelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true
        },
        description: {
            type: String,
            required: true,
            maxlength: 200,
            trim: true
        },
        id_workspace: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: WORKSPACE_COLLECTION_NAME
        }
    },
    {
        timestamps: true
    }

);

export const CHANNEL_COLLECTION_NAME = 'Channel';
const channelModel = mongoose.model(CHANNEL_COLLECTION_NAME, channelSchema);
export default channelModel;
