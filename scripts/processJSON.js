// Configure XHR
var songList1 = new XMLHttpRequest();
songList1.addEventListener("load", parseSongList);
songList1.open("GET", "json/songs1.json");
songList1.send();

// Parse JSON and populate songs array
function parseSongList() {
	var data = JSON.parse(this.responseText);
	console.log("SongList1:", data);
	// Create string like: Legs - by ZZ Top on the album Eliminator
	for (var i = 0; i < data.songs.length; i++) {
		var currentSong = data.songs[i];
		console.log(`Title ${i}: `, currentSong.title);
		console.log(`Artist ${i}: `, currentSong.artist);
		console.log(`Album ${i}: `, currentSong.album);
		console.log(`------------------`);
	};
}
