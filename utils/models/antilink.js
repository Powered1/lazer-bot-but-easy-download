const mongoose = require("mongoose");

const antilinkSchema = new mongoose.Schema({
    GuildID: String,
});

const antilinkModel = mongoose.model('antilink', antilinkSchema);

module.exports = antilinkModel;