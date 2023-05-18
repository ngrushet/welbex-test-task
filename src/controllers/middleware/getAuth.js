import jwt from "jsonwebtoken"

const secret = process.env.JWT_SECRET;

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, secret)
            req.userId = decoded.id;
            next();
        } catch (e) {
            return res.status(500).json({
                message: "Authorization failed"
            })
        }
    } else {
        return res.status(403).json({
            message: "Access denied"
        })
    }
}