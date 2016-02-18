$(document).ready(function() {
	$("#addView").hide(); // Start Add Music View hidden
	var songs = [];

	// Find where these vars are used, and replace them with direct references

	var listLink = document.getElementById("listLink");
	var addButton = document.getElementById("addButton");
	var moreButton = document.getElementById("moreButton");

	// Add each song to the DOM with IDs matching index in songs array
	function refreshSongList() {
		var newSongListText = ``;
		var songsLength = songs.length;
		for (var i = 0; i < songsLength; i++) {
			newSongListText += `<p id="${i}">${songs[i]} <button>Delete</button></p>`;
		};
		$(".songs").html(newSongListText);
	}
	// Add new song to songs array and refresh song list
	function addSong(newSong) {
		songs.push(newSong);
		refreshSongList();
	}

	// ~~~~~~~~~~~~~~~~~~~
	//   Event Listeners
	// ~~~~~~~~~~~~~~~~~~~

	// ***** jQuery Example *****
	$("#addLink").click(function() { // Used to be addLink variable
	  $("#listView").hide();
	  $("#addView").show();
	  // $("listView").toggleClass("visible");
	  // addView.classList.remove("hidden");
	});

	listLink.addEventListener("click", function() {
	  $("#listView").show();
	  $("#addView").hide();
	});

	addButton.addEventListener("click", function() {
		var newSong = ``;
		// collect inputs and create new song string
		newSong = `${$("#songName").val()} - by ${$("#artistName").val()} `;
		newSong += `on the album ${$("#albumName").val()}`;
		// send new song string to addSong function
		addSong(newSong);
		// clear inputs
		$("#artistName").val(``);
		$("#songName").val(``);
		$("#albumName").val(``);
		// Switch to listView
		$("#listView").show();
	  $("#addView").hide();
	});

	$("#listView").click(function(event) {
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

  // Combine parseSongList1 & parseSongList2 later
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
