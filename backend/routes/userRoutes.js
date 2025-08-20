import {
  AddUser,
  GetUserById,
  AllUser,
  GetTopPlayers,
} from "../Controller/User.js";
import { Router } from "express";

const router = Router();

router.post("/add", AddUser);
router.get("/all", AllUser);
router.get("/get/:id", GetUserById);
router.get("/topPlayers", GetTopPlayers);

export default router;
