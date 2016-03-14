"use strict";

app.controller("SongCtrl", [
  "$scope",
  "$http",        // $http is for AJAX
  "$location",
  "song-storage",

  function($scope, $http, $location, songStorage) {
    $scope.songSearchText = {name: "", artist: "", album: ""};
    $scope.query = ""; // What is this?
    
    songStorage().then( // songStorage is promise from song_storage.js
        function(songCollection) { // RESOLVE
          $scope.songs = [];
          for(let key in songCollection) {
            songCollection[key].id = key;
            $scope.songs.push(songCollection[key]);
          }
        },
        function() { // REJECT
          console.log("Rejected");
        }
    );

    $scope.deleteSong = function() {
      $http.delete('https://musichistoryph.firebaseio.com/songs/' + this.song.id +'.json');
      // .then($scope.$apply());  // well that didn't work
    };
  }
]);
