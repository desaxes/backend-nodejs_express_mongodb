import { param } from "express-validator";

export const idValidationMiddleware = param('id').trim().isLength({ min: 1 })