import express from "express";
import { uploadPost, deletePost, allPosts } from "../controllers/postController.js";
import { authProtect } from "../middlewares/authMiddleware.js";

const router = express.Router()

// Auth route
router.get('/posts', authProtect, allPosts)
router.post('/upload', authProtect, uploadPost)
router.delete('/delete', authProtect, deletePost)

export default router