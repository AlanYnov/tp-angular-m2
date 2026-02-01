import { Request, Response, NextFunction } from 'express';
import { sneakerService } from '../services/sneaker.service';
import { SneakerQuery } from '../validators/sneaker.validator';

export class SneakerController {
  getAllSneakers(req: Request, res: Response, next: NextFunction): void {
    try {
      const query = req.query as unknown as SneakerQuery;
      const result = sneakerService.findAll(query);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  getSneakerById(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = parseInt(req.params.id, 10);
      const sneaker = sneakerService.findById(id);
      res.status(200).json(sneaker);
    } catch (error) {
      next(error);
    }
  }
}

export const sneakerController = new SneakerController();
