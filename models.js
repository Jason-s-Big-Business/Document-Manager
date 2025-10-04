const Joi = require('joi');

class DocumentManagerModel {
    constructor(data = {}) {
        this.id = data.id || null;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
        this.data = data.data || {};
    }
    
    static getValidationSchema() {
        return Joi.object({
            id: Joi.number().integer().positive().allow(null),
            createdAt: Joi.date().default(Date.now),
            updatedAt: Joi.date().default(Date.now),
            data: Joi.object().default({})
        });
    }
    
    validate() {
        const schema = DocumentManagerModel.getValidationSchema();
        const { error, value } = schema.validate(this);
        
        if (error) {
            throw new ValidationError(error.details[0].message);
        }
        
        return value;
    }
    
    toJSON() {
        return {
            id: this.id,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
            data: this.data
        };
    }
    
    static fromJSON(json) {
        return new DocumentManagerModel(json);
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

module.exports = {
    DocumentManagerModel,
    ValidationError
};
