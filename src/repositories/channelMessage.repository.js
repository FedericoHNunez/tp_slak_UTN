import BaseRepository from './base.repository.js';
import channelMessagesModel from '../models/channelMessage.model.js';

class ChannelMessageRepository extends BaseRepository {
    constructor() {
        super(channelMessagesModel);
    }

    async create(content, id_channel, id_user) {
        const message = await this.model
            .create({
                content,
                id_channel,
                id_user
            });
        return message;
    }
    
    async getByChannelId(channelId) {
        return await this.model
            .find({ id_channel: channelId });
    }
}

const channelMessageRepository = new ChannelMessageRepository();
export default channelMessageRepository;
