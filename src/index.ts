import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { movieRoutes } from './routes/movie.routes';
import { tvShowRoutes } from './routes/tvshow.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://testfrontend-lemon.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin: any, callback: any) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    environment: process.env.NODE_ENV,
    allowedOrigins
  });
});

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/tvshows', tvShowRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Allowed origins:', allowedOrigins);
});