const mongoose = require("mongoose");

const raidSchema = new mongoose.Schema({
    GuildID: String,
});

const raidmodel = mongoose.model('raid-mode', raidSchema);

module.exports = raidmodel;