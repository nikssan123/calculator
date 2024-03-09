import express from "express";
import { getHistory, saveHistory } from "../helpers/history";
import { ensureCorrectUser } from "../middleware/auth";
const router = express.Router();

router.post("/:userId", ensureCorrectUser, saveHistory);
router.get("/:userId", ensureCorrectUser, getHistory);

export default router;