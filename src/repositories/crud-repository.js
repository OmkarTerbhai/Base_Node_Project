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
        try {
            const response = await this.model.findByPk(data);
            if(!response) {
                throw new AppError("Airplane does not exist", StatusCodes.NOT_FOUND);
            }
            return response;
        }
        catch(error) {
            Logger.error("Something went wrong in the CRUD repo");
            throw error;
        }
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

    async update(data) {
        try {
            const response = await this.model.update(data, {
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
}

module.exports = CrudRepository;