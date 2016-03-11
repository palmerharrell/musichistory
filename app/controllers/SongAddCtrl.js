"use strict";

app.controller("SongAddCtrl", [
  "$scope",
  "$http",
  "song-storage",

  function($scope, $http, songStorage) { // same order as above, name whatever you want
    console.log("Song Add Page Loaded");
  }
]);
