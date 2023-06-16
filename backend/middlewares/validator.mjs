import { check, validationResult } from 'express-validator';

const userValidator = [
	check('name').trim().not().isEmpty().withMessage('Name is missing!'),
	check('email').normalizeEmail().isEmail().withMessage('Email is invalid!'),
	check('password')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Password is missing!')
		.isLength({ min: 8, max: 20 })
		.withMessage('Password mus be 8 to 20 characters long!'),
];

const validate = (req, res, next) => {
    const error = validationResult(req).array()

    if (error.length) {
        return res.json({error: error[0].msg})
    } 

    next()
}

export {userValidator, validate}