import {isAdmin, isAuth} from '../middlewares/auth.mjs'
import {Router} from 'express'
import { getAppInfo } from '../controllers/admin.mjs'

const router = Router()

router.get('/app-info', isAuth, isAdmin, getAppInfo)


export default router