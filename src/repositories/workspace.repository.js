import BaseRepository from './base.repository.js';
import workspaceModel from '../models/workspace.model.js';

class WorkspaceRepository extends BaseRepository {
    constructor() {
        super(workspaceModel, ['name', 'description'], ['startDate', 'endDate']);
    }

    async create(nombre, description) {
        const workspaces = await this.model.create({
            name: nombre,
            description: description
        });
        return workspaces;
    }


}

const workspaceRepository = new WorkspaceRepository();
export default workspaceRepository;