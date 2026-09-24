import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes.js';
const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const allowedOrigins = [
    'http://localhost:5173',
    ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];
app.use(express.json());
app.use((request, response, next) => {
    const requestOrigin = request.headers.origin;
    if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
        response.header('Access-Control-Allow-Origin', requestOrigin);
    }
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    response.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    if (response.req.method === 'OPTIONS') {
        response.sendStatus(204);
        return;
    }
    next();
});
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
});
app.use('/api', apiRouter);
app.use((_request, response) => {
    response.status(404).json({ error: 'Route not found' });
});
app.use((error, _request, response, _next) => {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
});
async function startServer() {
    try {
        await connectDatabase();
        app.listen(port, '0.0.0.0', () => {
            console.log(`OctoFit API listening at ${apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Unable to start OctoFit API:', error);
        process.exit(1);
    }
}
startServer();
