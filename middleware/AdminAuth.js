const authorizeAdmin = (req, res, next) => {
    if (!["ADMIN", "SUPERADMIN"].includes(req.role)) {
        return res.status(403).json({
            success: false,
            error: true,
            message: "Access denied. Only ADMIN and SUPERADMIN can perform this action."
        });
    }
    next();
}

module.exports = authorizeAdmin;