import express from "express";
import { userAuth, registerUser, logoutUser, getUserProfile, } from "../controllers/userController.js";
import { authProtect } from "../middlewares/authMiddleware.js";

const router = express.Router()

// Auth route
router.post('/', registerUser)
router.post('/auth', userAuth)
router.post('/logout', logoutUser)
router.route('/profile').get(authProtect, getUserProfile)

export default router