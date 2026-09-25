import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import './config/database.js';
import apiRouter, { apiBaseUrl } from './routes/api.js';
const app = express();
const port = Number(process.env.PORT ?? 8000);
app.use(cors({ origin: true }));
app.use(express.json());
app.use('/api', apiRouter);
app.get('/', (_req, res) => {
    res.json({
        service: 'OctoFit Tracker API',
        apiBaseUrl,
        status: 'running',
    });
});
app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API listening on http://localhost:${port}`);
    console.log(`Codespaces-aware base URL: ${apiBaseUrl}`);
});
