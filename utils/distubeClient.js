const client = require("../index");
const Distube = require("distube");
const config = require('../config/config.json')

let distube = new Distube(client, {
  searchSongs: 0,
  emitNewSongOnly: false,
  leaveOnEmpty: false,
  leaveOnFinish: false,
  leaveOnStop: false,
  youtubeDL: true,
  updateYouTubeDL: true,
  customFilters : config.customFilters,
});


module.exports = distube;
