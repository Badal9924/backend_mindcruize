const express = require("express");
const router = express.Router();
const { saveDataIntoGoogleSheet } = require("../controller/googleSheet");

router.post("/googleSheet", saveDataIntoGoogleSheet);
module.exports = router;
// /api/v1/g/googleSheet
// AKfycbzV0ezO5RJxjkHDd7REt1-Jq-_STWuETd9pkvQqhZn6s2CmE4OAymn8Bvl5FxsMElby