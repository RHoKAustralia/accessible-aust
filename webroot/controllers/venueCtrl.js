angular.module('app')
	.controller('VenueCtrl', function VenueCtrl($scope, $routeParams, $filter, store) {
		'use strict';

		var venues = $scope.venues = store.venues;

		$scope.newVenue = '';
		$scope.editedVenue = null;

		$scope.$watch('venues', function () {
			$scope.remainingCount = $filter('filter')(venues, { completed: false }).length;
			$scope.completedCount = venues.length - $scope.remainingCount;
			$scope.allChecked = !$scope.remainingCount;
		}, true);

		// Monitor the current route for changes and adjust the filter accordingly.
		$scope.$on('$routeChangeSuccess', function () {
			var status = $scope.status = $routeParams.status || '';
			$scope.statusFilter = (status === 'active') ?
				{ completed: false } : (status === 'completed') ?
				{ completed: true } : {};
		});

		$scope.addVenue = function () {
			var newVenue = {
				title: $scope.newVenue.trim(),
				completed: false
			};

			if (!newVenue.title) {
				return;
			}

			$scope.saving = true;
			store.insert(newVenue)
				.then(function success() {
					$scope.newVenue = '';
				})
				.finally(function () {
					$scope.saving = false;
				});
		};

		$scope.editVenue = function (venue) {
			$scope.editedVenue = venue;
			// Clone the original venue to restore it on demand.
			$scope.originalVenue = angular.extend({}, venue);
		};

		$scope.saveEdits = function (venue, event) {
			// Blur events are automatically triggered after the form submit event.
			// This does some unfortunate logic handling to prevent saving twice.
			if (event === 'blur' && $scope.saveEvent === 'submit') {
				$scope.saveEvent = null;
				return;
			}

			$scope.saveEvent = event;

			if ($scope.reverted) {
				// Venue edits were reverted-- don't save.
				$scope.reverted = null;
				return;
			}

			venue.title = venue.title.trim();

			if (venue.title === $scope.originalVenue.title) {
				$scope.editedVenue = null;
				return;
			}

			store[venue.title ? 'put' : 'delete'](venue)
				.then(function success() {}, function error() {
					venue.title = $scope.originalVenue.title;
				})
				.finally(function () {
					$scope.editedVenue = null;
				});
		};

		$scope.revertEdits = function (venue) {
			venues[venues.indexOf(venue)] = $scope.originalVenue;
			$scope.editedVenue = null;
			$scope.originalVenue = null;
			$scope.reverted = true;
		};

		$scope.removeVenue = function (venue) {
			store.delete(venue);
		};

		$scope.saveVenue = function (venue) {
			store.put(venue);
		};

		$scope.toggleCompleted = function (venue, completed) {
			if (angular.isDefined(completed)) {
				venue.completed = completed;
			}
			store.put(venue, venues.indexOf(venue))
				.then(function success() {}, function error() {
					venue.completed = !venue.completed;
				});
		};

		$scope.clearCompletedVenues = function () {
			store.clearCompleted();
		};

		$scope.markAll = function (completed) {
			venues.forEach(function (venue) {
				if (venue.completed !== completed) {
					$scope.toggleCompleted(venue, completed);
				}
			});
		};
	});
