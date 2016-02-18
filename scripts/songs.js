$(document).ready(function() {

	$("#addView").hide(); // Start Add Music View hidden
	var songs = [];

	// Load 1st JSON file
	$.ajax({url: "json/songs1.json"}).done(parseSongList);

	// Add each song to the DOM with IDs matching index in songs array
	function refreshSongList() {
		var newSongListText = ``;
		for (var i = 0; i < songs.length; i++) {
			newSongListText += `<p id="${i}">${songs[i]} <button>Delete</button></p>`;
		};
		$(".songs").html(newSongListText);
	}
	// Add new song to songs array and refresh song list
	function addSong(newSong) {
		songs.push(newSong);
		refreshSongList();
	}

	// Read JSON data and push to array then DOM
  function parseSongList(data) {
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

	// Event Listeners
	$("#addLink").click(function() {
	  $("#listView").hide();
	  $("#addView").show();
	});

	$("#listLink").click(function() {
	  $("#listView").show();
	  $("#addView").hide();
	});

	$("#addButton").click(function() {
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
		if ($(event.target).html() === "Delete") {
			// remove song from array that matches id of paragraph containing delete button
			songs.splice(event.target.parentNode.getAttribute("id"), 1);
			// remove paragraph containing delete button
			event.target.parentNode.remove();
			// refresh song list and re-index song paragraphs
			refreshSongList();
		};
	});

	$("#moreButton").click(function() {
		// songList2.send();
		$(this).hide();
		$.ajax({url: "json/songs2.json"}).done(parseSongList);
	});
});
