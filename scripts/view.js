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
	