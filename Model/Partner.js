const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    partnerName: { type: String, required: true },
    partnerLogo: { type: String, required: true },
    publicId: { type: String, required: true }
},{
    timestamps: true
});

const PartnerModel = mongoose.model('Partner', partnerSchema);
module.exports = PartnerModel;