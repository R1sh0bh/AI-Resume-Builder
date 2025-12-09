import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createResumes, deleteResumes, getPublicResumebyId, getResumeById, updateResume } from "../controllers/resumeController.js";
import upload from "../configs/multer.js";

const resumeRouter = express.Router();

resumeRouter.post('/create', protect, createResumes)

resumeRouter.put('/update', protect, upload.single('image'), updateResume)

resumeRouter.delete('/delete/:resumeId', protect, deleteResumes)

resumeRouter.get('/get/:resumeId', protect, getResumeById)

resumeRouter.get('/public/:resumeId', getPublicResumebyId)

export default resumeRouter;