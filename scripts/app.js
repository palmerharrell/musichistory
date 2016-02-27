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




