"use strict";

let ViewModule = require("./view");
let FilterModule = require("./filter");
let songs = [];

let jsonParser = {

	getJson: function(jsonUrl) {
		$.ajax({url: jsonUrl}).done(jsonParser.parseSongList);
	},

	parseSongList: function(data) {

		for (let i = 0; i < data.songs.length; i++) {
      songs.push(data.songs[i]);
    }
	  // Populate Song List View with songs array
	  ViewModule.refreshListView(jsonParser.getSongList());
    FilterModule.populateDropdowns(jsonParser.getSongList());
	},

  getSongList: function() {
    return songs;
  },

  addSong: function(newSong) {
    songs.push(newSong);
    ViewModule.refreshListView(jsonParser.getSongList());
  },

  removeSong: function(event) {
    songs.splice($(event.target).parent().attr("id"), 1);
    ViewModule.refreshListView(jsonParser.getSongList());
  }

}

module.exports = jsonParser;
