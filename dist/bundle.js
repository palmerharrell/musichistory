(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

let JsonModule = require("./jsonParser");
let FilterModule = require("./filter");
let ViewModule = require("./view");

// Load 1st JSON file
JsonModule.getJson("json/songs2.json");

// Event Listeners
$("#addLink").click(ViewModule.addView);

$("#listLink").click(ViewModule.listView);

$("#moreButton").click(function() {
	$(this).hide();
	JsonModule.getJson("json/songs1.json");
});

$("#clearButton").click(function() {
	JsonModule.setFilteredSongList(JsonModule.getSongList());
	JsonModule.setSongList(JsonModule.getSongList());
	$("#selectArtist").val("none");
	$("#selectAlbum").val("none");
});

$("#listView").click(function(event) {
	if ($(event.target).html() === "Delete") {
		// remove song from array that matches id of paragraph containing delete button
		JsonModule.removeSong(event);
		// refresh song list and re-index song paragraphs
		ViewModule.refreshListView(JsonModule.getFilteredSongList());
	}
});

$("#selectArtist").on('change', function() {
	$("#selectAlbum").val("none");
	if (this.value === "none") {
		JsonModule.setSongList(JsonModule.getSongList());
		JsonModule.setFilteredSongList(JsonModule.getSongList());
	} else {
	// call getMatches method and set song list to filtered list
	let filteredByArtist = FilterModule.getMatches("artist", this.value, JsonModule.getSongList());
	JsonModule.setSongList(filteredByArtist);
	JsonModule.setFilteredSongList(filteredByArtist);
	}
});

$("#selectAlbum").on('change', function() {
	$("#selectArtist").val("none");
	if (this.value === "none") {
		JsonModule.setSongList(JsonModule.getSongList());
		JsonModule.setFilteredSongList(JsonModule.getSongList());
	} else {
	// call getMatches method and set song list to filtered list
	let filteredByAlbum = FilterModule.getMatches("album", this.value, JsonModule.getSongList());
	JsonModule.setSongList(filteredByAlbum);
	}
});

// *** TO DO ***




// Re-filter on add or remove
// addButton Event Listener below


$("#addButton").click(function() {
	let newSong = ``;
	// collect inputs and create new song string
	newSong = `${$("#songName").val()} - by ${$("#artistName").val()}`;
	newSong += ` on the album ${$("#albumName").val()}`;
	// send new song string to addSong function
	JsonModule.addSong(newSong);
	// clear inputs
	$("#artistName, #songName, #albumName").val(``);
	// Switch to listView
	$("#listView").show();
  $("#addView").hide();
});





},{"./filter":2,"./jsonParser":3,"./view":4}],2:[function(require,module,exports){
"use strict";

let filterForm = {

	populateDropdowns: function(songList) {

		let artists = [];
		let albums = [];
		let filteredArtists = [];
		let filteredAlbums = [];
		let artistListHtmlStr = ``;
		let albumListHtmlStr = ``;

		let removeDupes = function (e, i, a) {
			if (e !== a[i+1]) {
				return e;
			}
		};

		let buildString = function (array) {
			let HtmlString = `<option value="none"></option>`;
			for (let i = 0; i < array.length; i++) {
				let currentItem = array[i];
				HtmlString += `<option value="${currentItem}">${currentItem}</option>`;
			}
			return HtmlString;
		}

		// make array of Artists and array of Albums
		for (let i = 0; i < songList.length; i++) {
			let currentSong = songList[i];
			artists.push(currentSong.artist);
			albums.push(currentSong.album);
		};

		// Sort and filter arrays
		filteredArtists = artists.sort().filter(removeDupes);
		filteredAlbums = albums.sort().filter(removeDupes);
	
		// Build HTML strings
		artistListHtmlStr = buildString(filteredArtists);
		albumListHtmlStr = buildString(filteredAlbums);

		// Set HTML of respective select elements
		$("#selectArtist").html(artistListHtmlStr);
		$("#selectAlbum").html(albumListHtmlStr);
	},

	getMatches: function(filterType, filterVal, songList) {

		let filteredObj = {};

		if (filterType === "artist") {	// Filter by Artist
			filteredObj = songList.filter(function(e, i, a) {
				if (e.artist === filterVal) {
					return e;
				}
			});
		} else {												// Filter by Album
			filteredObj = songList.filter(function(e, i, a) {
				if (e.album === filterVal) {
					return e;
				}
			});
		}
		return filteredObj;
	}

}

module.exports = filterForm;






},{}],3:[function(require,module,exports){
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
      idCounter++;
      console.log(idCounter);
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

  setSongList: function(newSongList) {
    ViewModule.refreshListView(newSongList);
  },

  setFilteredSongList: function(filteredSongList) {
    filteredSongs = filteredSongList;
    ViewModule.refreshListView(filteredSongList);
  },

  addSong: function(newSong) {
    songs.push(newSong);
    FilterModule.populateDropdowns(jsonParser.getSongList());
    ViewModule.refreshListView(jsonParser.getSongList());
  },

  removeSong: function(event) { // Why won't jQuery work here?

    for(let i = 0; i < songs.length; i++) {
      if(songs[i].songID === $(event.target).parent().attr("id")) {
        songs.splice(i, 1);
        break;
      }
    }

    for(let i = 0; i < filteredSongs.length; i++) {
      if(filteredSongs[i].songID === $(event.target).parent().attr("id")) {
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
  }

}

module.exports = jsonParser;

},{"./filter":2,"./view":4}],4:[function(require,module,exports){
"use strict";

// let JsonModule = require("./jsonParser");

let viewManager = {

		refreshListView: function(songObjArray) {
			let newSongListText = ``;
			for (let i = 0; i < songObjArray.length; i++) {
				let currentSong = songObjArray[i];
				newSongListText += `<p id="${currentSong.songID}">`;
				newSongListText += `${currentSong.title} - by `;
				newSongListText += `${currentSong.artist} on the album ${currentSong.album} `;
				newSongListText += `<button>Delete</button></p>`;
			}
			$(".songs").html(newSongListText);
		},

		addView: function() {
			$("#listView").hide();
	  	$("#addView").show();
		},

		listView: function() {
			$("#listView").show();
  		$("#addView").hide();
		}

	};

	module.exports = viewManager


},{}]},{},[1])


//# sourceMappingURL=bundle.js.map
