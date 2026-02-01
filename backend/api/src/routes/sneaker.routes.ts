import { Router } from 'express';
import { sneakerController } from '../controllers/sneaker.controller';
import { validateQuery, validateId } from '../validators/sneaker.validator';

const router = Router();

// GET /sneakers - Liste toutes les sneakers avec pagination, filtres, tri et recherche
router.get('/', validateQuery, sneakerController.getAllSneakers.bind(sneakerController));

// GET /sneakers/:id - Récupère une sneaker par son ID
router.get('/:id', validateId, sneakerController.getSneakerById.bind(sneakerController));

export default router;
