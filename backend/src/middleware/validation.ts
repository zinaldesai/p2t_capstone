// import { body, validationResult } from "express-validator";
// import { Request, Response, NextFunction } from "express";

// const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     next();
// }

// export const validateMyUserRequest = [
//     body("name").isString().notEmpty().withMessage("Name must be a string"),
//     body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be a string"),
//     body("city").isString().notEmpty().withMessage("City must be a string"),
//     body("country").isString().notEmpty().withMessage("Country must be a string"),  
//     handleValidationErrors,  
// ];

import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Error handling middleware
const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};

export const validateMyUserRequest = [
    // Validation chains from express-validator
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
  
    // Error handler to check for validation errors and pass control
    handleValidationErrors,  
];
