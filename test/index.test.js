const request = require('supertest');
const app = require('../index');

describe('Document-Manager API Tests', () => {
    describe('GET /', () => {
        it('should return success response', async () => {
            const response = await request(app)
                .get('/')
                .expect(200);
            
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('timestamp');
        });
    });
    
    describe('GET /health', () => {
        it('should return health status', async () => {
            const response = await request(app)
                .get('/health')
                .expect(200);
            
            expect(response.body).toHaveProperty('status', 'healthy');
            expect(response.body).toHaveProperty('timestamp');
        });
    });
    
    describe('Error handling', () => {
        it('should handle invalid routes', async () => {
            const response = await request(app)
                .get('/invalid-route')
                .expect(404);
        });
    });
});

describe('Document-Manager Business Logic Tests', () => {
    const { DocumentManagerModel, ValidationError } = require('../models');
    
    describe('Model validation', () => {
        it('should create valid model', () => {
            const model = new DocumentManagerModel({
                data: { test: 'value' }
            });
            
            expect(model.id).toBeNull();
            expect(model.data).toEqual({ test: 'value' });
            expect(model.createdAt).toBeInstanceOf(Date);
        });
        
        it('should validate model data', () => {
            const model = new DocumentManagerModel();
            const validated = model.validate();
            
            expect(validated).toBeDefined();
            expect(validated.id).toBeNull();
        });
    });
});
