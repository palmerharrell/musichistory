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
