const express = require("express");
const { getAllDownloads } = require("../controllers/downloadController");

const router = express.Router();

router.get("/", getAllDownloads);

module.exports = router;
