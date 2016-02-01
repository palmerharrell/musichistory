var songs = [];

songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";

// Use JavaScript arrays, loops, and innerHTML to show the music you love.

// Students must use JavaScript to create a list of songs in the index.html file 
// for their Music History project. Have them download the songs.js file, which contains 
// an array of strings with song information.

// Each student must add one song to the beginning and the end of the array.
songs.unshift("Prove My Love > by Violent Femmes on the album Violent Femmes");
songs.push("Cellphone's Dead > by Beck on the album The Information");


// Loop over the array and remove any words or characters that obviously don't belong.
// Students must find and replace the > character in each item with a - character.
for (var i = 0; i < songs.length; i++) {
	songs[i] = songs[i].replace("ZT", "Z T");
	songs[i] = songs[i].replace(/[^a-zA-Z0-9&'>\s]/g, "");
	songs[i] = songs[i].replace(">", "-");
};


// Must add each string to the DOM in index.html in the main content area.
var songList = document.getElementsByClassName("songList");
var newSongListText = "</p>";

for (var i = 0; i < songs.length; i++) {
	newSongListText += songs[i];
	newSongListText += "<br><br>";
};
newSongListText += "</p>"

songList[0].innerHTML = newSongListText;


// When the user clicks on "Add Music" in the navigation bar, the List Music View should 
// be hidden, and the Add Music View should be shown (see example wireframe).
// When the user clicks on "List Music" in the naviation bar, the Add Music View should 
// be hidden, and the List Music View should be shown (see example wireframe).

var addLink = document.getElementById("addLink");
var listLink = document.getElementById("listLink");
var addView = document.getElementById("addView");
var listView = document.getElementById("listView");

addLink.addEventListener("click", function(event) {
  event.preventDefault();
  listView.classList.add("hidden");
  addView.classList.add("visible");

  listView.classList.remove("visible");
  addView.classList.remove("hidden");
});

listLink.addEventListener("click", function(event) {
  event.preventDefault();
  addView.classList.add("hidden");
  listView.classList.add("visible");
  
  addView.classList.remove("visible");
  listView.classList.remove("hidden");
});

// Once the user fills out the song form and clicks the add button, you should collect 
// all values from the input fields, add the song to your array of songs, and update 
// the song list in the DOM.







