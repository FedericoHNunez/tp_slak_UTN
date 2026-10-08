import authService from "../services/auth.service.js";
import successResponse from "../helpers/response.helper.js";


class AuthController {
    async registerUser(req, res) {
        const { userName, email, password } = req.body;

        const id_user = await authService.registerUser(userName, email, password);

        return successResponse(res, "User created successfully.", id_user, 201);
    }

    async loginUser(req, res) {
        const { email, password } = req.body;

        const auth_token = await authService.loginUser(email, password);

        return successResponse(
            res,
            "User logged in successfully.",
            auth_token
        );
    }
}

const authController = new AuthController();
export default authController;
