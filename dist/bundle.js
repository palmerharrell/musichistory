(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

let JsonModule = require("./jsonParser");
let viewModule = require("./view");
console.log("JsonModule", JsonModule);
console.log("viewModule", viewModule);

// $(document).ready(function() {

	$("#addView").hide(); // Start Add Music View hidden

	// "var songs = [];" was here.
	

// "Load 1st JSON file" was here.
JsonModule.getJson("json/songs1.json");

	// Add each song to the DOM with IDs matching index in songs array
	// function refreshListView() {
	// 	var newSongListText = ``;
	// 	for (var i = 0; i < songs.length; i++) {
	// 		newSongListText += `<p id="${i}">${songs[i]} <button>Delete</button></p>`;
	// 	}
	// 	$(".songs").html(newSongListText);
	// 	console.log("Song List: ", songs);
	// }
	// Add new song to songs array and refresh song list
	function addSong(newSong) {
		songs.push(newSong);
		viewModule.refreshListView(jsonParser.getSongList());
	}

// "Read JSON data and push to array then DOM" was here.

	// Event Listeners
	$("#addLink").click(function() {
	  $("#listView").hide();
	  $("#addView").show();
	});

	$("#listLink").click(function() {
	  $("#listView").show();
	  $("#addView").hide();
	});

	$("#addButton").click(function() {
		var newSong = ``;
		// collect inputs and create new song string
		newSong = `${$("#songName").val()} - by ${$("#artistName").val()}`;
		newSong += ` on the album ${$("#albumName").val()}`;
		// send new song string to addSong function
		addSong(newSong);
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
			viewModule.refreshListView(jsonParser.getSongList());
		}
	});

	$("#moreButton").click(function() {
		$(this).hide();
		$.ajax({url: "json/songs2.json"}).done(parseSongList);
	});
// });

},{"./jsonParser":2,"./view":3}],2:[function(require,module,exports){
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

},{"./view":3}],3:[function(require,module,exports){
"use strict";

let JsonModule = require("./jsonParser");

let viewManager = {
		refreshListView: function(songArray) {
			// let songArray = JsonModule.getSongList();
			let newSongListText = ``;
			for (let i = 0; i < songArray.length; i++) {
				newSongListText += `<p id="${i}">${songArray[i]} <button>Delete</button></p>`;
			}
			$(".songs").html(newSongListText);
			// console.log("Song List: ", songs);
		}

	};

	module.exports = viewManager;
	
},{"./jsonParser":2}]},{},[1])


//# sourceMappingURL=bundle.js.map
