import {Router} from 'express'

import { createActor } from '../controllers/actor.mjs'
import { uploadImage } from '../middlewares/multer.mjs'

const router = Router()

router.post('/create', uploadImage.single('avatar'), createActor)

export default router