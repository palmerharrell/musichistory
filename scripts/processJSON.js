$(document).ready(function() {
	
	// Configure XHR
	var songList1 = new XMLHttpRequest();
	var songList2 = new XMLHttpRequest();
	songList1.addEventListener("load", parseSongList1);
	songList2.addEventListener("load", parseSongList2);
	songList1.open("GET", "json/songs1.json");
	songList2.open("GET", "json/songs2.json");
	songList1.send();

	// Combine these functions later
	function parseSongList1() {
		var data = JSON.parse(this.responseText);
		for (var i = 0; i < data.songs.length; i++) {
			var currentSong = data.songs[i];
			var songString = ``;
			songString += `${currentSong.title} - by ${currentSong.artist} `;
			songString += `on the album ${currentSong.album}`;
			songs.push(songString);
		};
		// Populate Song List with songs array
		refreshSongList();
	};

	function parseSongList2() {
		var data = JSON.parse(this.responseText);
		for (var i = 0; i < data.songs.length; i++) {
			var currentSong = data.songs[i];
			var songString = ``;
			songString += `${currentSong.title} - by ${currentSong.artist} `;
			songString += `on the album ${currentSong.album}`;
			songs.push(songString);
		};
		// Populate Song List with songs array
		refreshSongList();
	};
});