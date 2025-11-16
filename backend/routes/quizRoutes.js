import express from "express";
import { getQuizByCourse, submitQuiz } from "../controllers/quizController.js";
const router = express.Router();

router.get("/:courseId", getQuizByCourse);
router.post("/submit", submitQuiz);

export default router;
