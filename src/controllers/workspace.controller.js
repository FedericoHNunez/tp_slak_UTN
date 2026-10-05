import workspaceRepository from "../repositories/workspace.repository.js";
import ServerError from "../helpers/error.helper.js";
import successResponse from "../helpers/response.helper.js";

class WorkspaceController {

    async getWorkspaces(req, res) {
        const { name } = req.query;
        let workspaceList;
        if (name) {
            workspaceList = await workspaceRepository.getBySearchTerm(name);
        } else {
            workspaceList = await workspaceRepository.get();
        }

        return successResponse(
            res,
            name ?
                `Workspaces retrieved by search term ${name}` :
                "Get all workspaces",
            { workspaces: workspaceList }
        );
    }

    async createWorkspace(req, res) {
        const { name, description } = req.body;
        if (!name || !description) {
            throw new ServerError(
                "Missing required fields: name and description are required.",
                400
            );
        }
        const workspace = await workspaceRepository.create(name, description);
        return successResponse(res, "Workspace created successfully.", { workspace }, 201);
    }

    async deleteWorkspaceById(req, res) {
        const { workspace_id } = req.params;
        const workspace = await workspaceRepository.deleteById(workspace_id);
        return successResponse(res, "Workspace deleted successfully.", { workspace }, 200);
    }
}

const workspaceController = new WorkspaceController();
export default workspaceController;