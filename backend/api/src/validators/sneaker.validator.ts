import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const sneakerQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  colors: z.string().optional(),
  sortBy: z.enum(['price', 'name', 'release_date']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
});

export const sneakerIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type SneakerQuery = z.infer<typeof sneakerQuerySchema>;
export type SneakerId = z.infer<typeof sneakerIdSchema>;

export function validateQuery(req: Request, res: Response, next: NextFunction): void {
  const result = sneakerQuerySchema.safeParse(req.query);
  if (!result.success) {
    res.status(400).json({
      error: 'Validation Error',
      details: result.error.errors,
    });
    return;
  }
  req.query = result.data as unknown as typeof req.query;
  next();
}

export function validateId(req: Request, res: Response, next: NextFunction): void {
  const result = sneakerIdSchema.safeParse(req.params);
  if (!result.success) {
    res.status(400).json({
      error: 'Validation Error',
      details: result.error.errors,
    });
    return;
  }
  next();
}
