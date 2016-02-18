
var songs = [];

$(document).ready(function() {
	var songList = document.getElementsByClassName("songs");
	// Find where these vars are used, and replace them with direct references
	// var addLink = $("#addLink");
	var listLink = document.getElementById("listLink");
	var addView = document.getElementById("addView");
	var listView = document.getElementById("listView");
	var addButton = document.getElementById("addButton");
	var artistInput = document.getElementById("artistName");
	var songInput = document.getElementById("songName");
	var albumInput = document.getElementById("albumName");
	var moreButton = document.getElementById("moreButton");

	// Add each song to the DOM with IDs matching index in songs array
	function refreshSongList() {
		var newSongListText = ``;
		var songsLength = songs.length;
		for (var i = 0; i < songsLength; i++) {
			newSongListText += `<p id="${i}">${songs[i]} <button>Delete</button></p>`;
		};
		$(".songs").html(newSongListText);
		// songList[0].innerHTML = newSongListText;
	}
	// Add new song to songs array and refresh song list
	function addSong(newSong) {
		songs.push(newSong);
		refreshSongList();
	}

	// ~~~~~~~~~~~~~~~~~~~
	//   Event Listeners
	// ~~~~~~~~~~~~~~~~~~~
	$("#addLink").click(function() {
	  listView.classList.add("hidden");
	  addView.classList.add("visible");
	  listView.classList.remove("visible");
	  addView.classList.remove("hidden");
	});

	listLink.addEventListener("click", function() {
	  addView.classList.add("hidden");
	  listView.classList.add("visible");
	  addView.classList.remove("visible");
	  listView.classList.remove("hidden");
	});

	addButton.addEventListener("click", function() {
		var newSong = "";
		// collect inputs and create new song string
		newSong = `${songInput.value} - by ${artistInput.value} on the album ${albumInput.value}`;
		// send new song string to addSong function
		addSong(newSong);
		// clear inputs
		artistInput.value = ``;
		songInput.value = ``;
		albumInput.value = ``;
		// Switch to listView
		addView.classList.add("hidden");
	  listView.classList.add("visible");
	  addView.classList.remove("visible");
	  listView.classList.remove("hidden");
	});

	listView.addEventListener("click", function(event) {
		if (event.target.innerHTML === "Delete") {
			// remove song from array that matches id of paragraph containing delete button
			songs.splice(event.target.parentNode.getAttribute("id"), 1);
			// remove paragraph containing delete button
			event.target.parentNode.remove();
			// refresh song list and re-index song paragraphs
			refreshSongList();
		};
	});

	moreButton.addEventListener("click", function() {
		songList2.send();
		moreButton.disabled = true;
	});

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
