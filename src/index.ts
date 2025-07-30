import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { movieRoutes } from './routes/movie.routes';
import { tvShowRoutes } from './routes/tvshow.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/tvshows', tvShowRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});