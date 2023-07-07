import dotenv from 'dotenv';
import { isValidObjectId } from 'mongoose';

import Actor from '../models/actor.mjs';
import { sendError, uploadImageToCloud } from '../utils/helper.mjs';
import cloudinary from '../cloud/index.mjs';
import { formatActor } from '../utils/helper.mjs';

dotenv.config();

const uploadTrailer = async (req, res) => {
    const {file} = req

    if (!file) return sendError(res, "Video file is missing!")

    const {secure_url: url, public_id} = await cloudinary.uploader.upload(file.path, {
        resource_type: "video"
    })
    res.status(201).json({url, public_id})
}

export { uploadTrailer };
