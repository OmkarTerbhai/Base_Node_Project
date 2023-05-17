const { Logger } = require('../config');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const { ErrorMessages } = require('../utils/constants');


class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(data) {
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            });
            console.log(response);
            if(response == 0) {
                throw new AppError(ErrorMessages.RESOURCE_NOT_FOUND, StatusCodes.NOT_FOUND);
            }
            return response;
        
    }

    async get(data) {
            const response = await this.model.findByPk(data);
            if(response == null) {
                console.log(response);
                throw new AppError("Resource does not exist", StatusCodes.NOT_FOUND);
            }
            return response;
        
        
    }

    async getAll() {
        const response = await this.model.findAll();
        if(!response) {
            throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
        }
        return response;
        
        
    }

    async update(id, data) {
            console.log("In CRUD REPO update");
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            if(response[0] == 0) {
                throw new AppError("Could not find resource to update", StatusCodes.NOT_FOUND);
            }
            console.log(response);
            return response;
    }
}

module.exports = CrudRepository;