import { Router } from "express";
import Controller  from '../controllers/data.controller'

const router  = Router()
router.get('/info', Controller.mdfLdf)
export default router