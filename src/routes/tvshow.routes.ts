import { Router } from 'express';
import { tvShowController } from '../controllers/tvshow.controller';

const router = Router();

router.post('/', tvShowController.create);
router.get('/', tvShowController.findAll);
router.put('/:id', tvShowController.update);
router.delete('/:id', tvShowController.delete);

export const tvShowRoutes = router; 