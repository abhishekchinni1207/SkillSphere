import express from "express";
import { getEnrollment } from "../controllers/enrollmentController.js";

const router = express.Router();

// GET /enrollments/:userId/:courseId
router.get("/:userId/:courseId", getEnrollment);

export default router;
