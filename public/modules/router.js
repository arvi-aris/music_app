App
.config(function($routeProvider){
	$routeProvider.when("/track",{
		templateUrl : "views/track.html",
    controller:"TrackController"
	});
  $routeProvider.when("/addTrack",{
		templateUrl : "views/add.html",
    controller:"AddController"
	});
  $routeProvider.when("/editTrack",{
    templateUrl : "views/add.html",
    controller:"AddController"
  });
  $routeProvider.when("/genres",{
		templateUrl : "views/genre.html",
    controller : "GenreController"
	});
  $routeProvider.when("/addGenre",{
		templateUrl : "views/add.html",
    controller : "AddController"
	});
	$routeProvider.when("/editGenre",{
		templateUrl : "views/add.html",
		controller:"AddController"
	});
	$routeProvider.otherwise({
		templateUrl : "views/track.html",
    controller:"TrackController"
	});
});
