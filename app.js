'use strict';

// Declare app level module which depends on views, and components
angular.module('apiMock', ['ngSanitize'])
	.config(['$httpProvider', function($httpProvider) {
        	$httpProvider.defaults.useXDomain = true;
        	delete $httpProvider.defaults.headers.common['X-Requested-With'];
    	}
	])
	.controller('apiMockController', ['$scope', '$http', function ($scope, $http) {
		$scope.requestType = localStorage.getItem('method');
		$scope.endpoint = localStorage.getItem('endpoint');
		
		$scope.payload = JSON.parse(localStorage.getItem('payload')) || [];
		$scope.headers = JSON.parse(localStorage.getItem('headers')) || [];
		
		$scope.response = false;
		
		$scope.addPayloadItem = function () {
			var payloadItem = {
				key: '',
				value: ''
			};
			
			$scope.payload.push(payloadItem);
			
		};
		
		$scope.addHeaderItem = function () {
			var headerItem = {
				key: '',
				value: ''
			};
			
			$scope.headers.push(headerItem);
		};
		
		$scope.sendRequest = function () {
			
			localStorage.setItem('endpoint', $scope.endpoint);
			localStorage.setItem('headers', JSON.stringify($scope.headers));
			localStorage.setItem('payload', JSON.stringify($scope.payload));
			localStorage.setItem('method', $scope.requestType);
			
			$scope.response = false;
			
			//create the headers
			var headers = {};
			$scope.headers.forEach(function (item, key) {
				if(item.key !== '' && item.value !== '')
					headers[item.key] = item.value;
			});
			
			//create the payload
			var payload = {};
			$scope.payload.forEach(function (item, key) {
				if(item.key !== '' && item.value !== '')
					payload[item.key] = item.value;
			});
			
			
			
			$http({
				method: $scope.requestType
				,url: $scope.endpoint
				,headers: headers
				,data: payload
			}).success(function (resp) {
				$scope.response = resp;
			}).error(function (err) {
				$scope.response = err;
			});
			
		};
		
		$scope.clearCache = function () {
			localStorage.setItem("endpoint", "");
			localStorage.setItem("headers", "[]");
			localStorage.setItem("payload", "[]");
		};
	}]);