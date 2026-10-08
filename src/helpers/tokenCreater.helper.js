import jwt from "jsonwebtoken";
import ENVIRONMENT from "../config/environment.config.js";

function createToken(payload) {
    const auth_token = jwt.sign(payload, ENVIRONMENT.JWT_TOKEN);
    return auth_token
}
export default createToken;
