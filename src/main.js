import express from "express";
import connectMongoDB from "./config/mongo.configDB.js";
import userRouter from "./routers/user.router.js";
import authRouter from "./routers/auth.router.js";
import jsonErrorHandler from "./middlewares/jsonError.middleware.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import successResponse from "./helpers/response.helper.js";
import workspaceRouter from "./routers/workspace.router.js";
import directMessageRouter from "./routers/directMessage.router.js";
import ENVIRONMENT from "./config/environment.config.js";

// 1. Connect to the database
await connectMongoDB();

const PORT = ENVIRONMENT.PORT;
const app = express();

app.use(express.json());

// Middleware to catch JSON format errors (SyntaxError)
app.use(jsonErrorHandler);

// Healthcheck endpoint
app.get("/api/status", (req, res) => {
  return successResponse(res, "Express Server OK!");
});

// Authentication endpoints
app.use("/api/auth", authRouter);

// User endpoints
app.use("/api/users", userRouter);

// Workspaces
app.use('/api/workspaces', workspaceRouter);

// Direct messages
app.use('/api/directMessages', directMessageRouter);

// Centralized error handler
app.use(errorHandler);


// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
