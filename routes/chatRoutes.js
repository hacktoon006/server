const express = require("express");
const router = express.Router();
const { sendChat, getChats } = require("../controllers/chatController");

router.post("/send", sendChat);
router.get("/all", getChats);

module.exports = router;
