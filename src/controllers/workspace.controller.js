import workspaceService from "../services/workspace.service.js";
import successResponse from "../helpers/response.helper.js";

class WorkspaceController {

    async getWorkspaces(req, res) {
        const { name, description } = req.query;
        const workspaceList = await workspaceService.getWorkspaces(name, description);

        return successResponse(
            res,
            name || description ?
                `Workspaces retrieved by search term ${name || description}` :
                "Get all workspaces",
            { workspaces: workspaceList }
        );
    }

    async createWorkspace(req, res) {
        const { name, description } = req.body;
        const workspace = await workspaceService.createWorkspace(name, description);
        return successResponse(res, "Workspace created successfully.", { workspace }, 201);
    }

    async deleteWorkspaceById(req, res) {
        const { workspace_id } = req.params;
        const workspace = await workspaceService.deleteWorkspaceById(workspace_id);
        return successResponse(res, "Workspace deleted successfully.", { workspace }, 200);
    }
}

const workspaceController = new WorkspaceController();
export default workspaceController;