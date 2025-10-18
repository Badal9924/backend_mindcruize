const authorizeSuperAdmin = (req, res, next) => {
    if (req.role !== "SUPERADMIN") {
        return res.status(403).json({
            success: false,
            error: true,
            message: "Access denied. Only SUPERADMIN can perform this action."
        });
    }
    next();
}

module.exports = authorizeSuperAdmin;