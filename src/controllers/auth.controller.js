import userRepository from "../repositories/user.repository.js";
import ServerError from "../helpers/error.helper.js";
import successResponse from "../helpers/response.helper.js";


class AuthController {
    async registerUser(req, res) {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            throw new ServerError(
                "Missing required fields: userName, email, and password are required.",
                400);

        }
        if (! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new ServerError(
                "Invalid email format.",
                400
            );
        }
        const userEmailExist = await userRepository.getByEmail(email);

        if (userEmailExist) {
            throw new ServerError(
                "User with this email already exists.",
                409
            );
        }
        const user = await userRepository.create(userName, email, password);
        return successResponse(res, "User created successfully.", { user }, 201);
    }

    async loginUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ServerError(
                "Missing required fields: email and password are required.",
                400
            );
        }
        const userEmailExist = await userRepository.getByEmail(email);
        if (!userEmailExist) {
            throw new ServerError(
                "User with this email does not exist.",
                404
            );
        }
        const userPasswordMatch = await userRepository.checkPassword(email, password);
        if (!userPasswordMatch) {
            throw new ServerError(
                "Invalid password.",
                401
            );
        }
        return successResponse(
            res,
            "User logged in successfully.",
            { userEmailExist }
        );
    }
}

const authController = new AuthController();
export default authController;
