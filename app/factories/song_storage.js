"use strict";

app.factory("song-storage", function($q, $http) {

  function getSongList() {

    // Return a promise for our async XHR
    return $q(function(resolve, reject) {

      // Perform some asynchronous operation, resolve or reject 
      // the promise when appropriate.
      $http.get('https://musichistoryph.firebaseio.com/.json')
      .success(
        function(objectFromJSONFile) {
          // "resolve" is function after .then in SongCtrl.js
          resolve(objectFromJSONFile.songs);
        },function(error) {
          reject(error);
        }
      );

    });
  }

  return getSongList(); // Remove parentheses to re-use promise
                        // Add the parentheses after songStorage 
                        //   every time it is called!
                        // Replace other GETs with songStorage calls
});
