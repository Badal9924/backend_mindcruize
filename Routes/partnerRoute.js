const express = require('express');
const { createPartner, getAllPartner } = require('../controller/ParternerController');
const upload = require('../middleware/multer');
const authorizeAdmin = require('../middleware/AdminAuth');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = express.Router();

router.post('/create-partner', isAuthenticated, authorizeAdmin, upload.single('partnerLogo'), createPartner);
router.get('/getAllPartnerData', getAllPartner);
module.exports = router;