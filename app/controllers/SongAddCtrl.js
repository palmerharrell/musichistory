"use strict";

app.controller("SongAddCtrl", [ // "SongAddCtrl is name of controller. [] contain dependencies and logic"
  "$scope",
  "$http",
  "$location",

  function($scope, $http, $location) { // same order as above, name whatever you want
    
    // Bound to inputs on song-add.html
    $scope.newSong = {};
    
    $scope.addSong = function() {
      $http.post('https://musichistoryph.firebaseio.com/songs/.json', JSON.stringify($scope.newSong))
      .then(function () { // this needs to be changed to call song-storage
        return $http.get('https://musichistoryph.firebaseio.com/.json');
      })
      .then(function(songCollection) {
        $scope.songs = [];
        for(let key in songCollection.data.songs) {
          songCollection.data.songs[key].id = key;
          $scope.songs.push(songCollection.data.songs[key]);
        }
        
        $location.path('/');
        
      });
    };
  }
]);

