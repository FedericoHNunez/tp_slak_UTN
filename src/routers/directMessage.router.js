import express from "express";
import directMessageController from "../controllers/directMessage.controller.js";

const directMessageRouter = express.Router();

directMessageRouter.get('/', directMessageController.getAllDirectMessages);

export default directMessageRouter;
