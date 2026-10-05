import workspaceRepository from "../repositories/workspace.repository.js";
import ServerError from "../helpers/error.helper.js";

class WorkspaceService {
    async getWorkspaces(name, description) {
        return await workspaceRepository.get({ name, description });
    }

    async createWorkspace(name, description) {
        if (!name || !description) {
            throw new ServerError(
                "Missing required fields: name and description are required.",
                400
            );
        }
        return await workspaceRepository.create(name, description);
    }

    async deleteWorkspaceById(workspace_id) {
        return await workspaceRepository.deleteById(workspace_id);
    }
}

const workspaceService = new WorkspaceService();
export default workspaceService;
