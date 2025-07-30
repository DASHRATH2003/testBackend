import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { movieRoutes } from './routes/movie.routes';
import { tvShowRoutes } from './routes/tvshow.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/tvshows', tvShowRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});