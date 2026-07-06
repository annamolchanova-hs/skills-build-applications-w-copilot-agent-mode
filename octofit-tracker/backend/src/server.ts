import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes/api';
import { getApiBaseUrl } from './config/api';

const app = express();
const port = process.env.PORT || 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: getApiBaseUrl() });
});

app.use('/api', apiRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Backend running on port ${port}`);
      console.log(`API base URL: ${getApiBaseUrl()}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

startServer();
