import { Router, application } from "express";
import { getAllZoo, getOneZoo, getZooBudget, getZooNombre, createZoo, deleteZoo } from "../controllers/zooController.js";

const router = Router()

router.get('/api/zoo', getAllZoo)
router.get('/api/zoo/id/:id', getOneZoo)
router.get('/api/zoo/budget', getZooBudget)
router.post('/api/zoo/findByName', getZooNombre)
router.post('/api/zoo/createZoo', createZoo)
router.delete('/api/zoo/deleteZoo/:id_zoo', deleteZoo)

export default router;