(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

let JsonModule = require("./jsonParser");
let ViewModule = require("./view");

// $("#addView").hide(); // Start Add Music View hidden
console.log("start");

// Load 1st JSON file
JsonModule.getJson("json/songs1.json");

// Event Listeners
$("#addLink").click(ViewModule.addView);

$("#listLink").click(ViewModule.listView);

$("#moreButton").click(function() {
	$(this).hide();
	JsonModule.getJson("json/songs2.json");
});



// *** TO DO ***

$("#addButton").click(function() {
	var newSong = ``;
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

$("#listView").click(function(event) {
	if ($(event.target).html() === "Delete") {
		// remove song from array that matches id of paragraph containing delete button
		songs.splice($(event.target).parent().attr("id"), 1);
		// remove paragraph containing delete button
		$(event.target).parent().remove();
		// refresh song list and re-index song paragraphs
		ViewModule.refreshListView(jsonParser.getSongList());
	}
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

},{"./view":3}],3:[function(require,module,exports){
"use strict";

let JsonModule = require("./jsonParser");

let viewManager = {

		refreshListView: function(songArray) {
			let newSongListText = ``;
			for (let i = 0; i < songArray.length; i++) {
				newSongListText += `<p id="${i}">${songArray[i]} <button>Delete</button></p>`;
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

	module.exports = viewManager;

},{"./jsonParser":2}]},{},[1])


//# sourceMappingURL=bundle.js.map
