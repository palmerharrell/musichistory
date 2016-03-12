"use strict";

app.controller("SongCtrl", [
  "$scope",
  "$http",
  "song-storage",

  function($scope, $http, songStorage) {
    $scope.songSearchText = {name: "", artist: "", album: ""};
    $scope.query = "";
    
    songStorage.then( // songStorage is promise from song_storage.js
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
  }
]);
