const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
});

const Download = mongoose.model("Download", downloadSchema);

module.exports = Download;
