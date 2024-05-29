import { ValidationChain, body } from "express-validator";

export const registrationMiddleware: ValidationChain[] = ([
    body('login').isLength({ min: 6 }).withMessage('min length is 6 symbols'),
    body('email').isEmail().withMessage('incorrect email'),
    body('password').isLength({ min: 8, max: 16 }).withMessage('min length is 8 symbols')
])