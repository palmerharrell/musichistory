"use strict";

app.controller("SongCtrl", [
  "$scope",
  "$http",
  "song-storage",

  function($scope, $http, songStorage) { // same order as above, name whatever you want
    $scope.songSearchText = {name: "", artist: "", album: ""};
    $scope.query = "";
    
    songStorage.then(
        function(songCollection) {
          $scope.songs = [];
          for(let key in songCollection) {
            songCollection[key].id = key;
            $scope.songs.push(songCollection[key]);
          }
        },
        function() {

        }
    );
  }
]);
