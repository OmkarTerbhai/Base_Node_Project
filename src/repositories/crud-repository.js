const { Logger } = require('../config');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
            console.log("Inside repo")
            const response = await this.model.create(data);
            return response;
    }

    async destroy(data) {
        try {
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            });

            return response;
        }
        catch(error) {
            Logger.error("Something went wrong in the CRUD repo");
            throw error;
        }
    }

    async get(data) {
        
            const response = await this.model.findByPk(data);
            if(response == null) {
                console.log(response);
                throw new AppError("Airplane does not exist", StatusCodes.NOT_FOUND);
            }
            return response;
        
        
    }

    async getAll() {
        try {
            const response = await this.model.findAll();

            return response;
        }
        catch(error) {
            Logger.error("Something went wrong in the CRUD repo");
            throw error;
        }
    }

    async update(id, data) {
            console.log("In CRUD REPO update");
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            if(response[0] == 0) {
                throw new AppError("Could not find airplane to update", StatusCodes.NOT_FOUND);
            }
            console.log(response);
            return response;
    }
}

module.exports = CrudRepository;