const Chat = require("../models/Chat");

// POST /api/chat/send
exports.sendChat = async (req, res) => {
  try {
    const { sender, message } = req.body;

    if (!sender || !message) {
      return res.status(400).json({ message: "Sender and message are required" });
    }

    const chat = await Chat.create({ sender, message });
    res.status(201).json(chat);
  } catch (err) {
    console.error("Send Chat Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// GET /api/chat/all
exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 });
    res.status(200).json(chats);
  } catch (err) {
    console.error("Get Chats Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
