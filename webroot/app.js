angular.module('app', ['ngRoute', 'ngResource'])
	.config(function ($routeProvider) {
		'use strict';

		var routeConfig = {
			controller: 'VenueCtrl',
			templateUrl: 'index.html',
			resolve: {
				store: function (todoStorage) {
					// Get the correct module (API or localStorage).
					return venueStorage.then(function (module) {
						module.get();
						return module;
					});
				}
			}
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});
