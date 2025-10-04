const express = require('express');
const winston = require('winston');
const helmet = require('helmet');

// Configure logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'document_manager.log' }),
        new winston.transports.Console()
    ]
});

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Main application logic
function runDocumentManager() {
    logger.info(`Starting ${repo_name} application...`);
    
    // Simulate business logic
    for (let i = 0; i < 5; i++) {
        logger.info(`Processing step ${i + 1} for ${repo_name}...`);
    }
    
    logger.info(`${repo_name} application completed successfully.`);
    return true;
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Main endpoint
app.get('/', (req, res) => {
    try {
        const result = runDocumentManager();
        res.json({ 
            message: `${repo_name} is running`,
            success: result,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        logger.error('Error in main endpoint:', error);
        res.status(500).json({ error: 'Application error' });
    }
});

app.listen(PORT, () => {
    logger.info(`${repo_name} server running on port ${PORT}`);
});

module.exports = app;
