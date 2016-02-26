(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

$(document).ready(function() {

	$("#addView").hide(); // Start Add Music View hidden
	var songs = [];

	// Load 1st JSON file
	$.ajax({url: "json/songs1.json"}).done(parseSongList);

	// Add each song to the DOM with IDs matching index in songs array
	function refreshSongList() {
		var newSongListText = ``;
		for (var i = 0; i < songs.length; i++) {
			newSongListText += `<p id="${i}">${songs[i]} <button>Delete</button></p>`;
		}
		$(".songs").html(newSongListText);
		console.log("Song List: ", songs);
	}
	// Add new song to songs array and refresh song list
	function addSong(newSong) {
		songs.push(newSong);
		refreshSongList();
	}

	// Read JSON data and push to array then DOM
  function parseSongList(data) {
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
			refreshSongList();
		}
	});

	$("#moreButton").click(function() {
		$(this).hide();
		$.ajax({url: "json/songs2.json"}).done(parseSongList);
	});
});

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map
