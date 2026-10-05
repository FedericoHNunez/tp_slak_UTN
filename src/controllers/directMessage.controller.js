import directMessageRepository from "../repositories/directMessage.repository.js";
import successResponse from "../helpers/response.helper.js";
import ServerError from "../helpers/error.helper.js";

class DirectMessageController {
    async getAllDirectMessages(req, res) {
        const { content } = req.query;
        let foundMessages;
        if (content) {
            foundMessages = await directMessageRepository.getMessagerBySearchTerm(content);
        } else {
            foundMessages = await directMessageRepository.get();
        }
        return successResponse(res, "Messages retrieved successfully", { messages: foundMessages });
    }
}
const directMessageController = new DirectMessageController();
export default directMessageController;