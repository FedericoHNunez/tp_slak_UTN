import express from 'express';
import workspaceController from '../controllers/workspace.controller.js';

const workspaceRouter = express.Router();

workspaceRouter.get('/', workspaceController.getWorkspaces);
workspaceRouter.post('/', workspaceController.createWorkspace);
workspaceRouter.delete('/:workspace_id', workspaceController.deleteWorkspaceById);

export default workspaceRouter;
