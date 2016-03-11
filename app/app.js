"use strict";

let app = angular.module("SongApp", ['ngRoute']);

app.config(['$routeProvider',
  ($routeProvider) => {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/song-list.html',
        controller: 'SongCtrl'
      }).
      when('/songs/:songId', { // songId is defined here, value comes from {{song.id}} in song-list.html
      	templateUrl: 'partials/song-detail.html',
      	controller: 'SongDetailCtrl'
      }).
      when('/song/new', {
      	templateUrl: 'partials/song-add.html',
      	controller: 'SongAddCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
