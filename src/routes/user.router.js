import express from 'express';
import userController from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:user_id', userController.getUserById);

export default userRouter;
