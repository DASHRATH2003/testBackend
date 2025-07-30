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
  'https://testfrontend-8cot.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

console.log('Server starting with config:', {
  port,
  allowedOrigins,
  nodeEnv: process.env.NODE_ENV
});

const corsOptions = {
  origin: function (origin: any, callback: any) {
    console.log('Incoming request from origin:', origin);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('Allowing request with no origin');
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('Origin is allowed:', origin);
      callback(null, true);
    } else {
      console.log('Origin is not allowed:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    environment: process.env.NODE_ENV,
    allowedOrigins,
    currentTime: new Date().toISOString()
  });
});

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/tvshows', tvShowRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Allowed origins:', allowedOrigins);
});