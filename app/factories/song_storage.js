"use strict";

app.factory("song-storage", function($q, $http) {

  function getSongList() {

    // Return a promise for our async XHR
    return $q(function(resolve, reject) {

      // Perform some asynchronous operation, resolve or reject 
      // the promise when appropriate.
      // $http.get('./data/songs.json')
      $http.get('https://musichistoryph.firebaseio.com/.json')
      .success(
        function(objectFromJSONFile) {
          console.log("objectFromJSONFile.songs", objectFromJSONFile.songs);
          resolve(objectFromJSONFile.songs); // "resolve" is function after .then in SongCtrl.js
        },function(error) {
          reject(error);
        }
      );

    });
  }

  return getSongList();
});
