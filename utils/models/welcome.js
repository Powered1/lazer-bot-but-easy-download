const mongoose = require("mongoose");

const welcomeSchema = new mongoose.Schema({
    GuildID: String,
    Welcome: String
});

const welcomemodel = mongoose.model('welcomer', welcomeSchema);

module.exports = welcomemodel;