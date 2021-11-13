const mongoose = require("mongoose");

const antiwordsSchema = new mongoose.Schema({
    GuildID: String,
});

const antiwordModel = mongoose.model('antiwords', antiwordsSchema);

module.exports = antiwordModel;