import BaseRepository from './base.repository.js';
import workspaceModel from '../models/workspace.model.js';

class WorkspaceRepository extends BaseRepository {
    constructor() {
        super(workspaceModel);
    }

    async create(nombre, description) {
        const workspaces = await this.model.create({
            name: nombre,
            description: description
        });
        return workspaces;
    }

    async getByDateRange(startDate, endDate) {
        const workspaceResult = await this.model.find({
            createdAt: {
                $gte: new Date(startDate), // Busca fechas mayores o iguales a startDate
                $lte: new Date(endDate)    // Busca fechas menores o iguales a endDate
            }
        });
        return workspaceResult;
    }

    async getBySearchTerm(term) {
        const workspaceResult = await this.model.find({
            $or: [
                { name: { $regex: term, $options: "i" } },
                { description: { $regex: term, $options: "i" } }
            ]
        }).limit(10); // Limita los resultados a 10
        return workspaceResult;
    }


}

const workspaceRepository = new WorkspaceRepository();
export default workspaceRepository;