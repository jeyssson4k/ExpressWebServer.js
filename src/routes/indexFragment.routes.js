import { Router } from "express";
import Controller  from '../controllers/data.controller'

const router  = Router()
router.get('/indexFrag', Controller.indexFragmentation)
export default router