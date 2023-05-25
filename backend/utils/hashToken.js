import jwt from "jsonwebtoken"

const hashToken = (res, userId) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.cookie('jwt', token, {
        // domain: process.env.FRONTEND_URL,
        httpOnly: false,
        secure: false, // Use secure cookies in production
        sameSite: 'lax', // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

}

const logoutToken = (res) => {

    res.clearCookie("jwt");
}

export { logoutToken }
export default hashToken