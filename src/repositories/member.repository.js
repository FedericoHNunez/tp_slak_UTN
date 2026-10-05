import BaseRepository from './base.repository.js';
import memberModel from "../models/member.model.js";

class MemberRepository extends BaseRepository {
    constructor() {
        super(memberModel);
    }

    async create(id_user, id_workspace, rol) {
        const member = await this.model.create({
            id_user: id_user,
            id_workspace: id_workspace,
            role: rol
        });
        return member;
    }

    // traer todas las membresias de un usuario
    async getAllWorkspacesByUserId(userId) {
        const members = await this.model
            .find({ id_user: userId })
            .populate('id_workspace');
        return members;
    }

    // traer todo los miembros de un espacio de trabajo 
    async getAllUsersByWorkspaceId(workspaceId) {
        const members = await this.model
            .find({ id_workspace: workspaceId })
            .populate('id_user', 'nombre apellido email');
        return members;
    }
}

// clase de una sola instancia, no hace falta instanciarla cada vez que se quiera usar
const memberRepository = new MemberRepository();
export default memberRepository;