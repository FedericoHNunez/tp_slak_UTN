import directMessageService from "../services/directMessage.service.js";
import successResponse from "../helpers/response.helper.js";

class DirectMessageController {
    async getAllDirectMessages(req, res) {
        const { content } = req.query;
        
        const foundMessages = await directMessageService.getAllDirectMessages(content);
        
        return successResponse(res, "Messages retrieved successfully", { messages: foundMessages });
    }
}
const directMessageController = new DirectMessageController();
export default directMessageController;