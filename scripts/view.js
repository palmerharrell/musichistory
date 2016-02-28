"use strict";

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

