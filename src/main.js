import express from "express";
import connectMongoDB from "./config/mongo.configDB.js";
import userRouter from "./routers/user.router.js";
import authRouter from "./routers/auth.router.js";
import jsonErrorHandler from "./middlewares/jsonError.middleware.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import successResponse from "./helpers/response.helper.js";
import workspaceRouter from "./routers/workspace.router.js";
import directMessageRouter from "./routers/dictecMessage.router.js";

// 1. Conectar a la base de datos
await connectMongoDB();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Middleware para atrapar errores de formato JSON (SyntaxError)
app.use(jsonErrorHandler);

// Endpoint de verificación (Healthcheck)
app.get("/api/status", (req, res) => {
  return successResponse(res, "Servidor Express OK!");
});

//endpoints autenticación
app.use("/api/auth", authRouter);

//Endpoints usuarios
app.use("/api/users", userRouter);

//workspaces 
app.use('/api/workspaces', workspaceRouter);

//direct messages
app.use('/api/directMessages', directMessageRouter);

// Manejador centralizado de errores
app.use(errorHandler);


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
