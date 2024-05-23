import {isAdmin, isAuth} from '../middlewares/auth.mjs'
import {Router} from 'express'
import { getAppInfo, getMostRated } from '../controllers/admin.mjs'

const router = Router()

router.get('/app-info', isAuth, isAdmin, getAppInfo)
router.get('/most-rated', isAuth, isAdmin, getMostRated)


export default router