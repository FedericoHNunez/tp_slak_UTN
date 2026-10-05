import userRepository from "../repositories/user.repository.js";
import ServerError from "../helpers/error.helper.js";
import successResponse from "../helpers/response.helper.js";


class UserController {
    async getUsers(req, res) {
        const { userName } = req.query;
        let userList;

        if (userName) {
            userList = await userRepository.getBySearchTerm(userName);
        } else {
            userList = await userRepository.get();
        }
        return successResponse(res, userName ? "users retrieved by search term" : "get all users", { users: userList });

    }

    async getUserById(req, res) {
        const { user_id } = req.params;

        // Buscar en la DB el usuario por su ID
        const user = await userRepository.getById(user_id);

        // Validar si el usuario existe
        if (!user) {
            throw new ServerError(`User with ID ${user_id} not found`, 404);
        }

        // Respuesta exitosa
        return successResponse(res, "User retrieved successfully", { user });
    }


}

const userController = new UserController();
export default userController;
