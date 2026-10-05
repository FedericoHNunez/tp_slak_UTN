import directMessageRepository from "../repositories/directMessage.repository.js";

class DirectMessageService {
    async getAllDirectMessages(content) {
        return await directMessageRepository.get(content);
    }
}

const directMessageService = new DirectMessageService();
export default directMessageService;
