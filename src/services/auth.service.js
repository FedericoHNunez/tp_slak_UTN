import userRepository from "../repositories/user.repository.js";
import ServerError from "../helpers/error.helper.js";
import { hashPassword, compareHash } from "../helpers/bcrypt.helper.js";
import { isValidEmail } from "../helpers/emailvalidation.helper.js";

class AuthService {
    async registerUser(userName, email, password) {
        if (!userName || !email || !password) {
            throw new ServerError(
                "Missing required fields: userName, email, and password are required.",
                400
            );
        }

        if (!isValidEmail(email)) {
            throw new ServerError("Invalid email format.", 400);
        }

        const userEmailExist = await userRepository.getByEmail(email);
        if (userEmailExist) {
            throw new ServerError("User with this email already exists.", 409);
        }

        const hashedPassword = await hashPassword(password);
        const user = await userRepository.create(userName, email, hashedPassword);
        return user;
    }

    async loginUser(email, password) {
        if (!email || !password) {
            throw new ServerError(
                "Missing required fields: email and password are required.",
                400
            );
        }

        if (!isValidEmail(email)) {
            throw new ServerError("Invalid email format.", 400);
        }

        const user = await userRepository.getByEmail(email);
        if (!user) {
            throw new ServerError("Invalid credentials", 401);
        }

        const userPasswordMatch = await compareHash(password, user.password);
        if (!userPasswordMatch) {
            throw new ServerError("Invalid credentials", 401);
        }
        return user;
    }
}

const authService = new AuthService();
export default authService;
