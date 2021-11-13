const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    GuildID: String,
    Role: String
});

const rolemodel = mongoose.model('autorole', roleSchema);

module.exports = rolemodel;