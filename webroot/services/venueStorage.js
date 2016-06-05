angular.module('app')
	.factory('venueStorage', function ($http, $injector) {
		'use strict';

		// Detect if an API backend is present. If so, return the API module, else
		// hand off the localStorage adapter
		return $http.get('/api')
			.then(function () {
				return $injector.get('api');
			}, function () {
				return $injector.get('localStorage');
			});
	})

	.factory('api', function ($resource) {
		'use strict';

		var store = {
			venues: [],

			api: $resource('/api/venues/id', null,
				{
					update: { method:'PUT' }
				}
			),

			clearCompleted: function () {
				var originalVenues = store.venues.slice(0);

				var incompleteVenues = store.venues.filter(function (venue) {
					return !venue.completed;
				});

				angular.copy(incompleteVenues, store.venues);

				return store.api.delete(function () {
					}, function error() {
						angular.copy(originalVenues, store.venues);
					});
			},

			delete: function (venue) {
				var originalVenues = store.venues.slice(0);

				store.venues.splice(store.venues.indexOf(venue), 1);
				return store.api.delete({ id: venue.id },
					function () {
					}, function error() {
						angular.copy(originalVenues, store.venues);
					});
			},

			get: function () {
				return store.api.query(function (resp) {
					angular.copy(resp, store.venues);
				});
			},

			insert: function (venue) {
				var originalVenues = store.venues.slice(0);

				return store.api.save(venue,
					function success(resp) {
						venue.id = resp.id;
						store.venues.push(venue);
					}, function error() {
						angular.copy(originalVenues, store.venues);
					})
					.$promise;
			},

			put: function (venue) {
				return store.api.update({ id: venue.id }, venue)
					.$promise;
			}
		};

		return store;
	})

	.factory('localStorage', function ($q) {
		'use strict';

		var STORAGE_ID = 'venues-angularjs';

		var store = {
			venues: [],

			_getFromLocalStorage: function () {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},

			_saveToLocalStorage: function (venues) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(venues));
			},

			clearCompleted: function () {
				var deferred = $q.defer();

				var incompleteVenues = store.venues.filter(function (venue) {
					return !venue.completed;
				});

				angular.copy(incompleteVenues, store.venues);

				store._saveToLocalStorage(store.venues);
				deferred.resolve(store.venues);

				return deferred.promise;
			},

			delete: function (venue) {
				var deferred = $q.defer();

				store.venues.splice(store.venues.indexOf(venue), 1);

				store._saveToLocalStorage(store.venues);
				deferred.resolve(store.venues);

				return deferred.promise;
			},

			get: function () {
				var deferred = $q.defer();

				angular.copy(store._getFromLocalStorage(), store.venues);
				deferred.resolve(store.venues);

				return deferred.promise;
			},

			insert: function (venue) {
				var deferred = $q.defer();

				store.venues.push(venue);

				store._saveToLocalStorage(store.venues);
				deferred.resolve(store.venues);

				return deferred.promise;
			},

			put: function (venue, index) {
				var deferred = $q.defer();

				store.venues[index] = venue;

				store._saveToLocalStorage(store.venues);
				deferred.resolve(store.venues);

				return deferred.promise;
			}
		};

		return store;
	});
