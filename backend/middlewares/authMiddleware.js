import cookieParser from 'cookie-parser'
import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authProtect = expressAsyncHandler(async (req, res, next) => {

    let token;

    token = req.cookies.jwt

    if (token) {

        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET)


            if (!decoded.userId) {
                res.status(401)
                throw new Error('Invalid Token exist')
            }

            req.user = await User.findById(decoded.userId).select('-password')

            // console.log(req.user);

        } catch (error) {

            res.status(401);
            throw new Error('Not authorized, no token');

        }

    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }


    next()

})


export { authProtect }

