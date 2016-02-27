"use strict";

let viewModule = require("./view");
let songs = [];

let jsonParser = {
	getJson: function(jsonUrl) {
		$.ajax({url: jsonUrl}).done(jsonParser.parseSongList);
	},
	parseSongList: function(data) {
		for (var i = 0; i < data.songs.length; i++) {
    var currentSong = data.songs[i];
    var songString = ``;
    songString += `${currentSong.title} - by ${currentSong.artist} `;
    songString += `on the album ${currentSong.album}`;
    songs.push(songString);
  	}
    console.log("songs: ", songs);
  	// Populate Song List with songs array
  	viewModule.refreshListView(jsonParser.getSongList());
	},
  getSongList: function() {
    return songs;
  }
}

module.exports = jsonParser;
