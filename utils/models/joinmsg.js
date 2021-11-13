const mongoose = require("mongoose");

const JoinMsgSchema = new mongoose.Schema({
    GuildID: String,
    JoinMsg: String
});

const joinmodel = mongoose.model('joinmsg', JoinMsgSchema);

module.exports = joinmodel;