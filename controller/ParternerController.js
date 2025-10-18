const PartnerModel = require("../Model/Partner");
const cloudinary = require("../utils/cloudinary");

const createPartner = async (req, res) => {
    try {
        const { partnerName } = req.body;
        const partnerLogo = req.file;
        if (!partnerName || !partnerLogo) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Name and partnerLogo are required"
            });
        }


        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "partnerLogoImage" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(partnerLogo.buffer);
        });

        const newPartner = await PartnerModel.create({
            partnerName,
            partnerLogo: result.secure_url,
            publicId: result.public_id
        });

        return res.status(200).json({
            data: newPartner,
            success: true,
            error: false,
            message: "Partner created Successfully..."
        })

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const getAllPartner = async (req, res) => {
    try {
        const data = await PartnerModel.find({});
        if (data.length !== 0) {
            return res.status(200).json({
                data,
                error: false,
                success: true
            })
        }
        return res.status(500).json({
            error: true,
            success: false,
            message: "Error while Loading the Partner Data"
        })
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

module.exports = { createPartner, getAllPartner };