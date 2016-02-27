(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

let JsonModule = require("./jsonParser");
let ViewModule = require("./view");

// Load 1st JSON file
JsonModule.getJson("json/songs1.json");

// Event Listeners
$("#addLink").click(ViewModule.addView);

$("#listLink").click(ViewModule.listView);

$("#moreButton").click(function() {
	$(this).hide();
	JsonModule.getJson("json/songs2.json");
});

$("#listView").click(function(event) {
	if ($(event.target).html() === "Delete") {
		// remove song from array that matches id of paragraph containing delete button
		JsonModule.removeSong(event);
		// refresh song list and re-index song paragraphs
		ViewModule.refreshListView(JsonModule.getSongList());
	}
});


// *** TO DO ***

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





},{"./jsonParser":2,"./view":3}],2:[function(require,module,exports){
"use strict";

let ViewModule = require("./view");
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

},{"./view":3}],3:[function(require,module,exports){
"use strict";

let JsonModule = require("./jsonParser");

let viewManager = {

		refreshListView: function(songArray) {
			let newSongListText = ``;
			for (let i = 0; i < songArray.length; i++) {
				let currentSong = songArray[i];
				newSongListText += `<p id="${i}">${currentSong.title} - by `;
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


},{"./jsonParser":2}]},{},[1])


//# sourceMappingURL=bundle.js.map
