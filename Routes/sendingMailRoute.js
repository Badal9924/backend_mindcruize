const express = require("express");
const router = express.Router();
const { sendingMailController, sendingMailBookSession, saveDataIntoGoogleSheet } = require("../controller/mail");

router.post("/send-mail", sendingMailController);
router.post("/send-mail/bookSession", sendingMailBookSession);
// router.post("/send-mail/bookSession/googleSheet", saveDataIntoGoogleSheet);
module.exports = router;