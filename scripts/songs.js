var songs = [];
var songList = document.getElementsByClassName("songList");
var addLink = document.getElementById("addLink");
var listLink = document.getElementById("listLink");
var addView = document.getElementById("addView");
var listView = document.getElementById("listView");
var addButton = document.getElementById("addButton");
var artistInput = document.getElementById("artistName");
var songInput = document.getElementById("songName");
var albumInput = document.getElementById("albumName");

// Add each song to the DOM
function refreshSongList() {
	var newSongListText = "";
	for (var i = 0; i < songs.length; i++) {
		newSongListText += `<p>${songs[i]}`;
		newSongListText += ` <button>Delete</button></p>`;
	};
	songList[0].innerHTML = newSongListText;
}

// Add new song to songs array and refresh song list
function addSong(newSong) {
	songs.push(newSong);
	refreshSongList();
}

// ~~~~~~~~~~~~~~~~~~~
//   Event Listeners
// ~~~~~~~~~~~~~~~~~~~
addLink.addEventListener("click", function(event) {
  listView.classList.add("hidden");
  addView.classList.add("visible");
  listView.classList.remove("visible");
  addView.classList.remove("hidden");
});

listLink.addEventListener("click", function(event) {
  addView.classList.add("hidden");
  listView.classList.add("visible");
  addView.classList.remove("visible");
  listView.classList.remove("hidden");
});

addButton.addEventListener("click", function(event) {
	var newSong = "";
	// collect inputs and create new song string
	newSong = songInput.value + " - by " + artistInput.value + " on the album " + albumInput.value;
	// send new song string to addSong function
	addSong(newSong);
	// clear inputs
	artistInput.value = "";
	songInput.value = "";
	albumInput.value = "";
	// Switch to listView
	addView.classList.add("hidden");
  listView.classList.add("visible");
  addView.classList.remove("visible");
  listView.classList.remove("hidden");
});

listView.addEventListener("click", function(event) {
	if (event.target.innerHTML === "Delete") {
		event.target.parentNode.remove();
	};
});

