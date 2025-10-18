const jwt = require("jsonwebtoken");

const generateJsonWebToken = (res, user) => {
    const token = jwt.sign({ userId: user?._id, role: user?.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });

    res.cookie("myToken", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        secure: process.env.NODE_ENV === "production", // prod me HTTPS required, local me false
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
}

module.exports = generateJsonWebToken;