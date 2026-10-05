class BaseRepository {
    constructor(model, searchFields = [], dateFields = []) {
        this.model = model;
        this.searchFields = searchFields;
        this.dateFields = dateFields;
    }

    async get(filters = null) {
        if (!filters) {
            return await this.model.find();
        }

        if (!this.searchFields || this.searchFields.length === 0) {
            return await this.model.find();
        }

        // Si nos pasan un string simple (ej. búsqueda genérica anterior)
        if (typeof filters === 'string') {
            const regex = { $regex: filters, $options: 'i' };
            const orConditions = this.searchFields.map(field => ({ [field]: regex }));
            return await this.model.find({ $or: orConditions });
        }

        // Si nos pasan un objeto de query params (ej. { name: 'algo', description: 'estado' })
        if (typeof filters === 'object' && filters !== null) {
            const orConditions = [];
            for (const [key, value] of Object.entries(filters)) {
                // Solo si el valor existe y el campo está en los definidos por el repo
                if (value && this.searchFields.includes(key)) {
                    orConditions.push({ [key]: { $regex: value, $options: 'i' } });
                }
            }
            
            if (orConditions.length === 0) {
                return await this.model.find();
            }
            return await this.model.find({ $or: orConditions });
        }

        return await this.model.find();
    }

    async getById(id) {
        return await this.model.findById(id);
    }

    async deleteById(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async updateById(id, updateData) {
        return await this.model.findByIdAndUpdate(id, updateData, { new: true });
    }

    async getByDateRange(startDate, endDate) {
        if (!this.dateFields || this.dateFields.length === 0) {
            return await this.model.find();
        }
        const orConditions = this.dateFields.map(field => ({
            [field]: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }));
        return await this.model.find({ $or: orConditions });
    }
}


export default BaseRepository;
