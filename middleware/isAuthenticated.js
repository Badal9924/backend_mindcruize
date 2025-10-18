const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.myToken;
    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided.",
            error: true,
            success: false
        });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.id = decode.userId;
        req.role = decode.role;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: true,
            message: "Invalid or expired token"
        });
    }

}

module.exports = isAuthenticated;