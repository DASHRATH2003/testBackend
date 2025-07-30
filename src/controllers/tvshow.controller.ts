import { Request, Response } from 'express';
import { tvShowSchema, tvShowUpdateSchema } from '../schemas/tvshow.schema';
import { prisma } from '../lib/prisma';

export const tvShowController = {
  async create(req: Request, res: Response) {
    try {
      const data = tvShowSchema.parse(req.body);
      const tvShow = await prisma.tVShow.create({ 
        data: {
          ...data,
          type: 'tvshow'
        } 
      });
      res.status(201).json(tvShow);
    } catch (error) {
      console.error('Error creating TV show:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid request' });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const [tvShows, total] = await Promise.all([
        prisma.tVShow.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.tVShow.count(),
      ]);

      // Add type field to each TV show
      const tvShowsWithType = tvShows.map(show => ({
        ...show,
        type: 'tvshow'
      }));

      res.json({
        data: tvShowsWithType,
        meta: {
          total,
          page,
          limit,
          hasMore: skip + limit < total,
        },
      });
    } catch (error) {
      console.error('Error fetching TV shows:', error);
      res.status(500).json({ error: 'Failed to fetch TV shows' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = tvShowUpdateSchema.parse(req.body);
      
      const tvShow = await prisma.tVShow.update({
        where: { id },
        data: {
          ...data,
          type: 'tvshow'
        },
      });
      
      res.json(tvShow);
    } catch (error) {
      console.error('Error updating TV show:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid request' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.tVShow.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting TV show:', error);
      res.status(400).json({ error: 'Failed to delete TV show' });
    }
  },
};