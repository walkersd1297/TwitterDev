const CrudRepository = require('./crud-repository.js');
const Like = require('../models/likes.js');

class LikeRepository extends CrudRepository {
    constructor() {
        super(Like);
    }

    async findByUserAndDoc(data) {
        try {
            const result = await this.model.findOne(data); 
            return result;
        } catch (error) {
            console.log("Something went wrong in Like Repository");
            throw error;
        }
    }
}

module.exports = LikeRepository;
