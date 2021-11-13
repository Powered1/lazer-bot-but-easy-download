const client = require("../index");
const Distube = require("distube");
const config = require('../config/config.json')

let distube = new Distube(client, {
  searchSongs: false,
  emitNewSongOnly: false,
  highWaterMark: 1024 * 1021 * 64,
  leaveOnEmpty: false,
  leaveOnFinish: false,
  leaveOnStop: false,
  youtubeDL: true,
  updateYouTubeDL: true,
  customFilters : config.customFilters,
});


module.exports = distube;
