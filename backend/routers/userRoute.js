import express from "express";
import { userAuth, registerUser, logoutUser, getUserProfile, updateUserProfile, adminControl } from "../controllers/userController.js";
import { authProtect, adminProtect } from "../middlewares/authMiddleware.js";

const router = express.Router()

// Auth route
router.post('/', registerUser)
router.post('/auth', userAuth)
router.post('/logout', logoutUser)
router.get('/admin', authProtect, adminProtect, adminControl)
router.route('/profile').get(authProtect, getUserProfile).put(authProtect, updateUserProfile)

export default router