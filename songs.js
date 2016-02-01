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

// Instructions (VERSION 3)

// Time to make Music History into a single page application. Before you begin
// please review the sample code I provided in JavaScript 103 about building a simple SPA.

// In the navigation bar, make sure you have two links labeled "List Music", and "Add Music".

// Add a DOM element that contains some input fields for the user to enter in the name 
// of a song, the artist for the song, and the album. You do not need to enclose them
// in a <form> element because we're not actually submitting this form anywhere.

// Add a <button> element at the bottom of the input fields labeled "Add".

// The input fields and the add button make up the Add Music View.

// The existing view - the combination of the filter form and the song list - will be 
// referred to as the List Music View.

// The Add Music View should not appear when the user first visits your page. The song 
// list with the corresponding filter form should be visible.

// When the user clicks on "Add Music" in the navigation bar, the List Music View should 
// be hidden, and the Add Music View should be shown (see example wireframe).

// When the user clicks on "List Music" in the naviation bar, the Add Music View should 
// be hidden, and the List Music View should be shown (see example wireframe).

// Once the user fills out the song form and clicks the add button, you should collect 
// all values from the input fields, add the song to your array of songs, and update 
// the song list in the DOM.


