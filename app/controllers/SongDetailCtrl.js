app.controller("SongDetailCtrl", [
  "$scope", 
  "$routeParams", 
  "song-storage",
  
  function($scope, $routeParams, songStorage) {

    songStorage.then(
      function(songArray) {
        $scope.songs = songArray;

            $scope.selectedSong = $scope.songs.filter(function(s) {
              return s.id == parseInt($routeParams.songId);
            })[0];
      },
      function() {

      }
    )
  }
]);
