"use strict";

let app = angular.module("SongApp", ['ngRoute']);

app.config(['$routeProvider',
  ($routeProvider) => {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/song-list.html',
        controller: 'SongCtrl'
      }).
      when('/songs/:songId', {
      	templateUrl: 'partials/song-detail.html',
      	controller: 'SongDetailCtrl'
      }).
      when('/song/new', {
      	templateUrl: 'partials/song-add.html',
      	// controller: 'SongDetailCtrl' // SongAddCtrl goes here
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
