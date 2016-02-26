"use strict";

$(document).ready(function() {

	let jsonParser = {
		getJson: function(jsonUrl) {
			$.ajax({url: jsonUrl}).done(parseSongList);
		},
		parseSongList: function(data) {
			for (var i = 0; i < data.songs.length; i++) {
      var currentSong = data.songs[i];
      var songString = ``;
      songString += `${currentSong.title} - by ${currentSong.artist} `;
      songString += `on the album ${currentSong.album}`;
      songs.push(songString);
    	}
    	// Populate Song List with songs array
    	refreshSongList();
		}
	}
	// Load 1st JSON file
	// $.ajax({url: "json/songs1.json"}).done(parseSongList);

	// Read JSON data and push to array then DOM
  // function parseSongList(data) {
  //   for (var i = 0; i < data.songs.length; i++) {
  //     var currentSong = data.songs[i];
  //     var songString = ``;
  //     songString += `${currentSong.title} - by ${currentSong.artist} `;
  //     songString += `on the album ${currentSong.album}`;
  //     songs.push(songString);
  //   }
  //   // Populate Song List with songs array
  //   refreshSongList();
  // }
	console.log("jsonParser", jsonParser);
	module.exports = jsonParser;
});

