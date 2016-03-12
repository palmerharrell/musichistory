"use strict";

let app = angular.module("SongApp", ['ngRoute']); // Things in brackets are dependencies

app.config(['$routeProvider',
  ($routeProvider) => {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/song-list.html',
        controller: 'SongCtrl'
      }).
      when('/songs/new', { // HAS to come before the one below. ':songId' matches ANYTHING that comes after /songs/
      	templateUrl: 'partials/song-add.html',
      	controller: 'SongAddCtrl'
      }).
      when('/songs/:songId', { // songId is defined here, value comes from {{song.id}} in song-list.html
      	templateUrl: 'partials/song-detail.html',
      	controller: 'SongDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

