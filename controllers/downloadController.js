const Download = require("../models/Downloads.js");

const getAllDownloads = async (req, res) => {
  try {
    const downloads = await Download.find();
    res.status(200).json(downloads);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { getAllDownloads };
