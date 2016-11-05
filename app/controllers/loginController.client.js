var amtApp = angular.module('amtApp', [
	'ngAnimate',
	'ngAria',
	'ngMaterial',
  'ngMessages']);
    
//angular.module('register', []);

// amtApp.config(function($mdThemingProvider) {
//   $mdThemingProvider.theme('default')
//     .primaryPalette('teal')
//     .accentPalette('amber')
//     .backgroundPalette('grey')
//     .warnPalette('deep-orange');
// });

amtApp
	.controller('registerController', ['$scope','$http',function registerController($scope,$http) {
	    $scope.user = {
	        gender:"MALE"
	    };
	    
	   // $scope.login = function() {
	   //     $http.get('/auth/google')
	   //         .then(function(response) {
	   //             console.log(response);
	   //         });
	   // };
	    
	}]);
