import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import hashToken, { logoutToken } from '../utils/hashToken.js'

// User Auth
// /api/user/auth
// Public
const userAuth = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && await user.comparePassword(password)) {
        hashToken(res, user._id)

        res
            .status(201)
            .json({
                message: "success",
                data: { name: user.name, email: user.email, _id: user._id, isAdmin: user.isAdmin }
            })

    } else {
        res.status(404)
        throw new Error('Wrong email or password')
    }

})


// User Register
// /api/user/
// Public
const registerUser = asyncHandler(async (req, res, next) => {

    try {
        const { name, email, password, isAdmin } = req.body
        const user = await User.create({ name, email, password, isAdmin })

        if (user) {
            hashToken(res, user._id)
            res.status(200).json({ message: 'User Register Route', data: { name: user.name, email: user.email, _id: user._id, isAdmin: user.isAdmin } })
        }


    } catch (error) {
        res.status(404)
        throw new Error('Invalid email or password')
    }


})


// User logout
// /api/user/logout
// Public
const logoutUser = asyncHandler(async (req, res, next) => {
    logoutToken(res)
    res.status(200).json({ message: "Logged out" })
})

// User profile
// /api/user/profile
// Public
const getUserProfile = asyncHandler(async (req, res, next) => {

    res.status(200).json({ user: req.user })

})

export { userAuth, registerUser, logoutUser, getUserProfile }