import BaseRepository from './base.repository.js';
import directMessageModel from '../models/directMessage.model.js';

class DirectMessageRepository extends BaseRepository {
    constructor() {
        super(directMessageModel, ['content']);
    }

    async create(content, id_receptor, id_emisor) {
        const message = await this.model
            .create({
                content,
                id_receptor,
                id_emisor
            });
        return message;
    }

    async getByUsers(id_receptor, id_emisor) {
        return await this.model
            .find({
                $or: [
                    { id_receptor: id_receptor, id_emisor: id_emisor },
                    { id_receptor: id_emisor, id_emisor: id_receptor }
                ]
            });
    }

}

const directMessageRepository = new DirectMessageRepository();
export default directMessageRepository;
