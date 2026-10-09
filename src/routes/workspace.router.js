import express from 'express';
import workspaceController from '../controllers/workspace.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';


const workspaceRouter = express.Router();

workspaceRouter.get('/', workspaceController.getWorkspaces);
workspaceRouter.post('/', authMiddleware, workspaceController.createWorkspace);
workspaceRouter.delete('/:workspace_id', authMiddleware, workspaceController.deleteWorkspaceById);

export default workspaceRouter;
