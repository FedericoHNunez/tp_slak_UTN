class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async get() {
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
}

export default BaseRepository;
