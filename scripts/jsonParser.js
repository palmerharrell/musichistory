"use strict";

let ViewModule = require("./view");
let FilterModule = require("./filter");
let songs = [];
let filteredSongs = [];
let idCounter = 0;

// Since jQuery won't work in this module for some reason:
let artistSelect = document.getElementById("selectArtist");
let albumSelect = document.getElementById("selectAlbum");

let jsonParser = {

	getJson: function(jsonUrl) {
		$.ajax({url: jsonUrl}).done(jsonParser.parseSongList);
	},

	parseSongList: function(data) {
		for (let i = 0; i < data.songs.length; i++) {
      songs.push(data.songs[i]);
      // increment idCounter and assign new ID to newest song object
      idCounter++;
      songs[songs.length-1].songID = idCounter;
    }
	  // Populate Song List View with songs array
    ViewModule.refreshListView(jsonParser.getSongList());
    FilterModule.populateDropdowns(jsonParser.getSongList());
    filteredSongs = songs;
	},

  getSongList: function() {
    return songs;
  },

  getFilteredSongList: function() {
    return filteredSongs;
  },

  newSongID: function() {
    idCounter++;
    return idCounter;
  },

  setSongList: function(newSongList) {
    ViewModule.refreshListView(newSongList);
  },

  setFilteredSongList: function(filteredSongList) {
    filteredSongs = filteredSongList;
    ViewModule.refreshListView(filteredSongList);
  },

  addSong: function(newSong) {
    songs.push(newSong);
    // Remove current filters
    artistSelect.value = "none";
    albumSelect.value = "none";
    // Add new options to filter menus
    FilterModule.populateDropdowns(jsonParser.getSongList());
    // Refresh view
    ViewModule.refreshListView(jsonParser.getSongList());
  },

  removeSong: function(parentID) { // Why won't jQuery work here?
    for(let i = 0; i < songs.length; i++) {
      if(songs[i].songID == parentID) {
        songs.splice(i, 1);
        break;
      }
    }
    for(let i = 0; i < filteredSongs.length; i++) {
      if(filteredSongs[i].songID == parentID) {
        filteredSongs.splice(i, 1);
        break;
      }
    }

    if (artistSelect.value === "none" && albumSelect.value === "none") {
      ViewModule.refreshListView(jsonParser.getSongList());
    } else if (artistSelect.value === "none") {
      filteredSongs = FilterModule.getMatches("album", albumSelect.value, songs);
      ViewModule.refreshListView(filteredSongs);
    } else {
      filteredSongs = FilterModule.getMatches("artist", artistSelect.value, songs);
      ViewModule.refreshListView(filteredSongs);
    }
    // Remove artists and albums from filter dropdowns if they no longer exist in songs
    FilterModule.populateDropdowns(jsonParser.getSongList());
  }

}

module.exports = jsonParser;
