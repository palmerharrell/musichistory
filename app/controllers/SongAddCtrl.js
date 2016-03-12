"use strict";

app.controller("SongAddCtrl", [ // "SongAddCtrl is name of controller. [] contain dependencies"
  "$scope",
  "$http",
  "$location",

  function($scope, $http, $location) { // same order as above, name whatever you want
    
    // Fill with inputs (bind?) on button click in addSong function below
    $scope.newSong = {};
    
    console.log("Song Add Page Loaded");

    $scope.addSong = function() {
      $http.post('https://musichistoryph.firebaseio.com/songs/.json',
        {name: "testTitle", artist: "testArtist", album: "testAlbum"} // REPLACE with newSong object
      );
      // Switch to List View and GET songs. This needs to be a promise! Song doesn't show up until 2nd time
      $location.path('/');
    };

    $scope.addSong(); // TEST TEST ~~~ DISABLE THIS! It POSTS a new song on page load!
  }
]);
