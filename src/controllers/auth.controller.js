import authService from "../services/auth.service.js";
import successResponse from "../helpers/response.helper.js";


class AuthController {
    async registerUser(req, res) {
        const { userName, email, password } = req.body;
        
        const user = await authService.registerUser(userName, email, password);
        
        return successResponse(res, "User created successfully.", { user }, 201);
    }

    async loginUser(req, res) {
        const { email, password } = req.body;
        
        const user = await authService.loginUser(email, password);
        
        return successResponse(
            res,
            "User logged in successfully.",
            { user }
        );
    }
}

const authController = new AuthController();
export default authController;
