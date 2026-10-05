import userRepository from "../repositories/user.repository.js";
import ServerError from "../helpers/error.helper.js";

class AuthService {
    async registerUser(userName, email, password) {
        if (!userName || !email || !password) {
            throw new ServerError(
                "Missing required fields: userName, email, and password are required.",
                400
            );
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new ServerError("Invalid email format.", 400);
        }

        const userEmailExist = await userRepository.getByEmail(email);
        if (userEmailExist) {
            throw new ServerError("User with this email already exists.", 409);
        }

        const user = await userRepository.create(userName, email, password);
        return user;
    }

    async loginUser(email, password) {
        if (!email || !password) {
            throw new ServerError(
                "Missing required fields: email and password are required.",
                400
            );
        }

        const user = await userRepository.getByEmail(email);
        if (!user) {
            throw new ServerError("Invalid credentials", 401);
        }

        const userPasswordMatch = await userRepository.checkPassword(email, password);
        if (!userPasswordMatch) {
            throw new ServerError("Invalid credentials", 401);
        }

        // TODO: Generate and return a JWT token instead of just the user data
        return user;
    }
}

const authService = new AuthService();
export default authService;
