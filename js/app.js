(function() {
	var app = angular.module('reservation', []);

	app.controller("ParkingSpotsCtrl", function($scope, $http) {

		this.getParkingInfo = function() {

			$http.get('http://localhost:8080/api/reservation').success(
					function(data, status, headers, config) {
						$scope.parkingLots = data;
					}).error(function(data, status, headers, config) {
				// log error
			});
		};

	});

	app.controller("ReservationCtrl", function($scope, $http) {
		$scope.reserveParking = function() {
			console.log($scope.reservation);
			$http.put('http://localhost:8080/api/reservation',
					$scope.reservation).success(
					function(data, status, headers) {
						$scope.ServerResponse = "spot reserved";
					}).error(
					function(data, status, header, config) {
						//log error
					});
		};
	});

})();