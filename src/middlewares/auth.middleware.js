import jwt from "jsonwebtoken"
import ENVIRONMENT from "../config/environment.config.js"
import ServerError from "../helpers/error.helper.js"

const authMiddleware = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        //verifico si hay header
        if (!header || !header.startsWith('Bearer ')) {
            throw new ServerError("The authorization header is missing or not in the correct format.", 400);
        }
        const auth_token = header.split(' ')[1]
        //verifico si hat token
        if (!auth_token) {
            throw new ServerError("The token is missing.", 400);
        }
        const { _id, userName, email } = jwt.verify(auth_token, ENVIRONMENT.TOKEN_JWT_KEY)

        //mutamos la req para guardar el id, user name y mail del usuario
        req.user = { id: _id, userName, email };
        //que vaya al siguiente controlador
        next();

    } catch (error) {
        if (
            error instanceof jwt.JsonWebTokenError
            || error instanceof jwt.NotBeforeError
            || error instanceof jwt.TokenExpiredError
        ) {
            return res.status(401).json({
                ok: false,
                status: 401,
                message: "Unauthorized"
            });
        }

        if (error.status) {
            return res.status(error.status).send(
                {
                    ok: false,
                    status: error.status,
                    message: error.message
                }
            )
        }

        console.log('[Middleware de Error]:', error)
        //Error generico
        return res.status(500).send(
            {
                ok: false,
                status: 500,
                message: 'Internal server error'
            }
        )
    }
}

export default authMiddleware;