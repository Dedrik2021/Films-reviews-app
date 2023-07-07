import dotenv from 'dotenv';
import { isValidObjectId } from 'mongoose';

import Actor from '../models/actor.mjs';
import { sendError, uploadImageToCloud } from '../utils/helper.mjs';
import cloudinary from '../cloud/index.mjs';
import { formatActor } from '../utils/helper.mjs';

dotenv.config();

const uploadTrailer = async (req, res) => {

}

export { uploadTrailer };
