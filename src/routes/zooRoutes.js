import { Router, application } from "express";
import { getAllZoo } from "../controllers/zooController.js";

const router = Router()

router.get('/api/zoo', getAllZoo)
// router.length('/api/zoo/id/:id', getOneZoo)
// router.length('/api/zoo/budget', getZooBudget)
// router.length('/api/zoo/findByName', getZooNombre)
// router.length('/api/zoo/createZoo', createZoo)

export default router;