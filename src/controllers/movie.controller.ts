import { Request, Response } from 'express';
import { movieSchema, movieUpdateSchema } from '../schemas/movie.schema';
import { prisma } from '../lib/prisma';

export const movieController = {
  async create(req: Request, res: Response) {
    try {
      console.log('Received request body:', req.body);
      const data = movieSchema.parse(req.body);
      console.log('Validated data:', data);
      const movie = await prisma.movie.create({ 
        data: {
          ...data,
          type: 'movie'
        } 
      });
      res.status(201).json(movie);
    } catch (error) {
      console.error('Validation error:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid request' });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const [movies, total] = await Promise.all([
        prisma.movie.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.movie.count(),
      ]);

      // Add type field to each movie
      const moviesWithType = movies.map(movie => ({
        ...movie,
        type: 'movie'
      }));

      res.json({
        data: moviesWithType,
        meta: {
          total,
          page,
          limit,
          hasMore: skip + limit < total,
        },
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ error: 'Failed to fetch movies' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = movieUpdateSchema.parse(req.body);
      
      const movie = await prisma.movie.update({
        where: { id },
        data: {
          ...data,
          type: 'movie'
        },
      });
      
      res.json(movie);
    } catch (error) {
      console.error('Error updating movie:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid request' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.movie.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting movie:', error);
      res.status(400).json({ error: 'Failed to delete movie' });
    }
  },
};