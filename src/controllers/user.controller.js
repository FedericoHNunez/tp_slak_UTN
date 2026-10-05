import userService from "../services/user.service.js";
import successResponse from "../helpers/response.helper.js";


class UserController {
    async getUsers(req, res) {
        const { userName } = req.query;
        
        const userList = await userService.getUsers(userName);
        
        return successResponse(res, userName ? "users retrieved by search term" : "get all users", { users: userList });

    }

    async getUserById(req, res) {
        const { user_id } = req.params;

        const user = await userService.getUserById(user_id);

        return successResponse(res, "User retrieved successfully", { user });
    }


}

const userController = new UserController();
export default userController;
