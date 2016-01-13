(function() {
	var app = angular.module('reservation', []);

	fetchData().then(bootstrapApplication);

    function fetchData() {
        var initInjector = angular.injector(["ng"]);
        var $http = initInjector.get("$http");

        return $http.get("/resolve?name=parking-service").then(function(response) {
            app.constant("baseUrl", response.data);
        }, function(errorResponse) {
            console.log("Error resolving base url");
        });
    }

    function bootstrapApplication() {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ["reservation"]);
        });
    }

	app.controller("ParkingSpotsCtrl", function($scope, $http, baseUrl) {

		this.getParkingInfo = function() {

			$http.get(baseUrl + '/api/reservation').success(
					function(data, status, headers, config) {
						$scope.parkingLots = data;
					}).error(function(data, status, headers, config) {
				// log error
			});
		};

	});

	app.controller("ReservationCtrl", function($scope, $http, baseUrl) {
		$scope.reserveParking = function() {
			console.log($scope.reservation);
			console.log($scope.reservation.parkingClientId);
			params = {"id":32802,"value":$scope.reservation.vehicleId,"action":"reserve"}
			// http://localhost:8080/api/reservation/0b6b66cb-4c4d-4b9a-ac29-e20b5029b408/32700/0/32802  {"id":32802,"value":"vehicle325","action":"reserve"}
			$http.put(baseUrl + '/api/reservation/'+$scope.reservation.parkingClientId+'/32700/0/32802',
					params).success(
					function(data, status, headers) {
						$scope.ServerResponse = "spot reserved";
					}).error(
					function(data, status, header, config) {
						//log error
					});
		};
	});

})();