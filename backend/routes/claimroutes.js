import Router from "express";
import { claimPoints } from "../Controller/UserPoints.js";
const router = Router();

router.post("/claim", claimPoints);

export default router;
