import { isValidObjectId } from "mongoose"
import passwordResetToken from "../models/passwordResetToken.mjs"
import { sendError } from "../utils/helper.mjs"

const isValidPassResetToken = async (req, res, next) => {
    const {token, userId} = req.body

    if (!token.trim() || !isValidObjectId(userId)) return sendError(res, "Invalid request!")

    const resetToken = await passwordResetToken.findOne({owner: userId})
    if (!resetToken) return sendError(res, 'Unauthorized access, invalid request!')

    const matched = await resetToken.compareToken(token)
    if (!matched) return sendError(res, 'Unauthorized access, invalid request!')

    req.resetToken = resetToken

    next()
}

export {isValidPassResetToken}