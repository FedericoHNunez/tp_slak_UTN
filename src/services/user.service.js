import userRepository from "../repositories/user.repository.js";
import ServerError from "../helpers/error.helper.js";

class UserService {
    async getUsers(userName) {
        return await userRepository.get(userName);
    }

    async getUserById(user_id) {
        const user = await userRepository.getById(user_id);
        if (!user) {
            throw new ServerError(`User with ID ${user_id} not found`, 404);
        }
        return user;
    }
}

const userService = new UserService();
export default userService;
