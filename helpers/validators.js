import { body } from 'express-validator'
import { validateErrors } from "./validate.error.js"

export const loginValidator = [
    body('username')
        .notEmpty().withMessage('Username is required'),
    body('password')
        .notEmpty().withMessage('Password is required'),
    validateErrors
]

    export const companyValidator = [
        body('name')
            .notEmpty().withMessage('The company name field must be filled')
            .isLength({min: 2, max: 100})
            .withMessage('Name length must be between 2 and 100 characters'),
        body('description')
            .notEmpty().withMessage('A description of the company is mandatory')
            .isLength({max: 500}).withMessage('Description text is too long (max 500 characters)'),
        body('impactLevel')
            .notEmpty().withMessage('Please specify the impact level')
            .isIn(['Bajo', 'Medio', 'Alto']).withMessage('Impact level must be Bajo, Medio, or Alto'),
        body('trajectoryYears')
            .notEmpty().withMessage('Company experience in years is needed')
            .isInt({min: 0}).withMessage('Experience years must be a positive number'),
        body('category')
            .notEmpty().withMessage('Business category must be selected')
            .isLength({max: 100}).withMessage('Category name is too long (max 100 characters)'),
        validateErrors
    ]