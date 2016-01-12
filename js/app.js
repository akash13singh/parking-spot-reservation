(function(){
	var app = angular.module('reservation',[]);
	
	app.controller("ParkingSpotsCtrl", function($scope, $http) {
		  /*$http.get('http://localhost:8080/api/clients').
		    success(function(data, status, headers, config) {
		      $scope.spots = data;
		    }).
		    error(function(data, status, headers, config) {
		      // log error
		    });*/
		  
		  this.getParkingInfo = function(){
			  
			  $http.get('http://localhost:8080/api/reservation').
			    success(function(data, status, headers, config) {
			      $scope.parkingLots = data;
			    }).
			    error(function(data, status, headers, config) {
			      // log error
			    });
		    };

	});
	
	app.controller("ReservationCtrl", function($scope, $http) {
		$scope.reserveParking = function(){
			 
			 var data = {
				 parkingClientId: "p123",
	             parkingSpotId: "s123",
	             vehicleId: "v123"
	            };
				window.alert(data+"fff");  
		 $http.put('http://localhost:8080/api/reservation',data)
         .success(function (data, status, headers) {
             $scope.ServerResponse = "spot reserved";
         })
         .error(function (data, status, header, config) {
             $scope.ServerResponse =  htmlDecode("Data: " + data +
                 "\n\n\n\nstatus: " + status +
                 "\n\n\n\nheaders: " + header +
                 "\n\n\n\nconfig: " + config);
         });  
		};
	});	
		  
})();