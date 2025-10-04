const dotenv = require('dotenv');
dotenv.config();

class DocumentManagerConfig {
    constructor() {
        this.database = {
            url: process.env.DATABASE_URL || 'mongodb://localhost:27017/document-manager',
            poolSize: parseInt(process.env.DATABASE_POOL_SIZE) || 10
        };
        
        this.server = {
            host: process.env.SERVER_HOST || '0.0.0.0',
            port: parseInt(process.env.SERVER_PORT) || 3000,
            debug: process.env.NODE_ENV === 'development'
        };
        
        this.business = {
            maxRetries: parseInt(process.env.MAX_RETRIES) || 3,
            timeoutMs: parseInt(process.env.TIMEOUT_MS) || 30000,
            rateLimit: parseInt(process.env.RATE_LIMIT) || 100
        };
    }
    
    validate() {
        const errors = [];
        
        if (!this.database.url) {
            errors.push('Database URL is required');
        }
        
        if (this.server.port < 1 || this.server.port > 65535) {
            errors.push('Invalid server port');
        }
        
        return errors;
    }
    
    toObject() {
        return {
            database: this.database,
            server: this.server,
            business: this.business
        };
    }
}

module.exports = new DocumentManagerConfig();
