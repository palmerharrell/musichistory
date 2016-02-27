"use strict";

// let JsonModule = require("./jsonParser"); // I haven't used this yet, may not be needed

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
			let HtmlString = ``;
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

	getMatches: function(filter) {
		// return matching song indexes or make a filtered object and call populate?
	}

}

module.exports = filterForm;
