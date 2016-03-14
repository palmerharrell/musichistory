"use strict";

app.controller("SongDetailCtrl", [
  "$scope", 
  "$routeParams", 
  "song-storage",
  
  function($scope, $routeParams, songStorage) {

    songStorage().then( // Is this doing anything? Isn't promise already resolved?
      function(songCollection) {
        $scope.songs = [];
        for(let key in songCollection) {
          songCollection[key].id = key;
          $scope.songs.push(songCollection[key]);
        }
        $scope.selectedSong = $scope.songs.filter(function(s) {
          return s.id === $routeParams.songId;
        })[0];
      },
      function() { // REJECT
          console.log("Rejected");
      }
    );
  }
]);
