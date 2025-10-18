const saveDataIntoGoogleSheet = async (req, res) => {
    try {
        const data = req.body;
        const response = await fetch(`https://script.google.com/macros/s/AKfycbwAYyBDmnspuxAT3HrYkRm4TKgmDINpRO2t9ucIcZBA2Lmvxx95yw4DDPGCrkeK6wPt/exec`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
        const text = await response.text();
        let responseData;
        try {
            responseData = JSON.parse(text);
        } catch (err) {
            return res.status(500).json({
                message: "Google Script did not return JSON",
                raw: text,
                success: false,
                error: true
            });
        }
        if (responseData.result === "success") {
            return res.status(200).json({ responseData, message: "Our Team will reach you soon", success: true });
        } else {
            return res.status(400).json({ responseData, message: "Failed to save data", success: false });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server Error",
            success: false,
            error: true
        });
    }
}

module.exports = { saveDataIntoGoogleSheet }