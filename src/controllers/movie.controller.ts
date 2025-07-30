import { Request, Response } from 'express';
import { movieSchema, movieUpdateSchema } from '../schemas/movie.schema';
import { prisma } from '../lib/prisma';

export const movieController = {
  async create(req: Request, res: Response) {
    try {
      console.log('Received request body:', req.body);
      const data = movieSchema.parse(req.body);
      console.log('Validated data:', data);
      const movie = await prisma.movie.create({ data });
      res.status(201).json(movie);
    } catch (error) {
      console.error('Validation error:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid request' });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      console.log('Received request for movies:', req.query);
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

      console.log('Found movies:', movies.length, 'Total:', total);

      res.json({
        data: movies,
        meta: {
          total,
          page,
          limit,
          hasMore: skip + limit < total,
        },
      });
    } catch (error) {
      console.error('Error in findAll:', error);
      res.status(500).json({ error: String(error) });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = movieUpdateSchema.parse(req.body);
      
      const movie = await prisma.movie.update({
        where: { id },
        data,
      });
      
      res.json(movie);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid request' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.movie.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete movie' });
    }
  },
};