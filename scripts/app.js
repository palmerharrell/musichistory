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
		JsonModule.removeSong($(event.target).parent().attr("id"));
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

$("#addButton").click(function() {
	// collect inputs and create new song object
	let newSong = {};
	newSong.songID = JsonModule.newSongID();
	newSong.album = $("#albumName").val();
	newSong.artist = $("#artistName").val();
	newSong.title = $("#songName").val();

	// send new song object to addSong function
	JsonModule.addSong(newSong);
	// clear inputs
	$("#artistName, #songName, #albumName").val(``);
	// Switch to listView
	ViewModule.listView();
});




