app.controller("SongCtrl", [
  "$scope",
  "$http",
  "song-storage",

  function($scope, $http, songStorage) { // same order as above, name whatever you want
    $scope.songSearchText = {name: "", artist: "", album: ""};
    $scope.query = "";
    
    songStorage.then(
        function(songArray) {
          $scope.songs = songArray;
        },
        function() {

        }
    )
  }
]);
