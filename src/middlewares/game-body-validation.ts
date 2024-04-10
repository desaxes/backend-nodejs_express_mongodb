import { ValidationChain, body } from "express-validator";

export const bodyValidationMiddleware: ValidationChain[] = ([
    body('title').isLength({ min: 3 }).withMessage('min length is 3 symbols'),
    body('genre').isIn(['Rpg', 'ARpg', 'Survival horror', 'CRpg', 'Interactive Movie', 'Action']).withMessage('incorrect genre'),
    body('year').isLength({ min: 4, max: 4 }),
])