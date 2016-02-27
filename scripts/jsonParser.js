"use strict";

let ViewModule = require("./view");
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
  	// Populate Song List View with songs array
  	ViewModule.refreshListView(jsonParser.getSongList());
	},

  getSongList: function() {
    return songs;
  },

  addSong: function(newSong) {
    songs.push(newSong);
    ViewModule.refreshListView(jsonParser.getSongList());
  }
  
}

module.exports = jsonParser;
