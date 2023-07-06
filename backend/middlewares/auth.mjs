import jwt from 'jsonwebtoken'

import User from '../models/user.mjs'
import { sendError } from '../utils/helper.mjs';

const isAuth = async (req, res, next) => {
	const token = req.headers?.authorization;

	if (!token) return sendError(res, "Invalid token!")
	const jwtToken = token.split('Bearer ')[1]

	if (!jwtToken) return sendError(res, "Invalid token!")
	const decode = jwt.verify(jwtToken, process.env.JWT_TOKEN)
	const {userId} = decode

	const user = await User.findById(userId)
	if (!user) return sendError(res, 'Ivalid token! User not found!')

	req.user = user
    next()
}

const isAdmin = (req, res, next) => {
	const {user} = req

	if (user.role !== 'admin') return sendError(res, "Unauthorized access!")

	next()
}

export {isAuth, isAdmin}