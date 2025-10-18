const oneToOneSessionPage = require("../emailpaes/bookingSession");
const contactUsPage = require("../emailpaes/contactUsPage");
const sendingMail = require("../nodeMailer/sendMail");

const sendingMailController = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, message, reCaptchaValue } = req.body;
        if (!firstName || !lastName || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "All fields are required"
            });
        }

        if (!reCaptchaValue) {
            return res.status(400).json({ success: false, message: "Captcha missing" });
        }

        // Verify reCAPTCHA :)
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${reCaptchaValue}`;

        const response = await fetch(verifyUrl, { method: 'POST' });
        const data = await response.json();

        if (!data.success) {
            return res.status(400).json({ success: false, error: true, message: "Captcha verification failed" });
        }

        await sendingMail(
            process.env.EMAIL_USER,
            `Contact Form Submission from ${firstName} ${lastName}`,
            `Mindcruize`,
            contactUsPage(firstName, lastName, phone, email, message)
        );
        return res.status(200).json({
            success: true,
            message: "Thank you for submitting details. Our team will connect you soon!",
            error: false
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server Error",
            success: false,
            error: true
        });
    }
}

const sendingMailBookSession = async (req, res) => {
    try {
        const { name, email, grade, mobile } = req.body;
        if (!name || !email || !grade || !mobile) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "All fields are required"
            });
        }

        await sendingMail(
            process.env.EMAIL_USER,
            `Book one to one Session from ${name}`,
            `Mindcruize`,
            oneToOneSessionPage(name, email, grade, mobile)
        );
        return res.status(200).json({
            success: true,
            message: "Thank you for submitting details. Our team will connect you soon!"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server Error",
            success: false,
            error: true
        });
    }
}

module.exports = { sendingMailController, sendingMailBookSession };