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
          for(let key in songCollection) {
            songCollection[key].id = key;
            console.log("songCollection[key]", songCollection[key]);
          }
          console.log("songCollection after adding ids: ", songCollection);
          $scope.songs = songCollection; // this is not right anymore
        },
        function() {

        }
    );
  }
]);
