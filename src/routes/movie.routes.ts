import { Router } from 'express';
import { movieController } from '../controllers/movie.controller';

const router = Router();

router.post('/', movieController.create);
router.get('/', movieController.findAll);
router.put('/:id', movieController.update);
router.delete('/:id', movieController.delete);

export const movieRoutes = router; 