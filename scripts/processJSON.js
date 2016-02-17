// Configure XHR
var songList1 = new XMLHttpRequest();
songList1.addEventListener("load", parseSongList);
songList1.open("GET", "json/songs1.json");
songList1.send();

function parseSongList() {
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

