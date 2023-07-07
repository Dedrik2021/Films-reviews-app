import { Router } from 'express';

import { isAdmin, isAuth } from '../middlewares/auth.mjs';
import { uploadTrailer } from '../controllers/movie.mjs';
import { uploadVideo } from '../middlewares/multer.mjs';

const router = Router();

router.post('/upload-trailer', isAuth, isAdmin, uploadVideo.single("video"), uploadTrailer)

export default router;
