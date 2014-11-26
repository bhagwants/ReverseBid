'use strict';

var chart

var dhcApp=angular.module('dhcApp',['ui.bootstrap', 'vcRecaptcha', 'dialogDir','applicationContainerDir','applicationContainerCtrl',
    'inputComponentDir','ngRoute','ui.bootstrap.timepicker', 'registrationPageDir','loginPageDir','forgetPasswordPageDir','formDir','contactUsPageDir','privacyPolicyDir','termsOfUseDir']);

var varWindowClass = 'animated fadeIn';
var url=address+appName+"/";
var loginUrl=address+appName+"/login.html";
var urlMyGoalThumbnails=url+"40";
var urlMychallengesThumbnails=url+"90";
var urlMyGoal=url;
var urlTopic=url+"20";
var urlLandingPage=url+"10";

var url_root=address+appName;
var url_logout=address+appName+"/api/logout/1.0"
var registration_url=address+appName+"/api/register/1.0/newUser";
var login_url=address+appName+"/api/login/1.0/user";
var forgetPassword_url=address+appName+"/api/passwordRecovery/1.0";
var myGoal_url=url_root+"/api/boContent/1.0/201";
var submitFormUrl=url+'submitForm'
var instanceCtrl = function () {}
dhcApp.config(['$routeProvider',
                         function($routeProvider,$rootScope) {

    $routeProvider.
      when('/login', {template: '<div login-Page-Dir ng-init="$parent.service='+"'"+'login'+"'"+'"></div>'}).
      when('/registration', {template: '<div registration-Page-Dir ng-init="$parent.service='+"'"+'registration'+"'"+'"></div>'}).
      when('/contactUs', {template: '<div contact-Us-Page-Dir ng-init="$parent.service='+"'"+'contactUs'+"'"+'"></div>'}).
      when('/termsOfUse', {template: '<div terms-Of-Use-Dir ng-init="$parent.service='+"'"+'termsOfUser'+"'"+'"></div>'}).
      when('/privacyPolicy', {template: '<div privacy-Policy-Dir ng-init="$parent.service='+"'"+'privacyPolicy'+"'"+'"></div>'}).
      
      otherwise({
	redirectTo: '/login'
      });
}]);

dhcApp.controller('AddOrderController', function($scope) {
	
	$scope.message = 'This is Add new order screen';
	
});


dhcApp.controller('ShowOrdersController', function($scope) {

	$scope.message = 'This is Show orders screen';

});




dhcApp.filter('truncate', function() {
      return function(input,length) {
        return (input.length > length ? input.substring(0, length) : input );
      };
    });
var ModalInstanceCtrl = function () {
    //this is not required now but can be used later on
};

dhcApp.controller('mainMenu',function($scope,$modal,$rootScope,$anchorScroll){
	
	                 
	



   
    $scope.$on('flipPage',function(event,page){
    	window.navigate('/registration')
        $scope.service=page;
    });
    $scope.$watch('service',function(){
        // background styling
    	if ($scope.service=='login'){
            // login
            $rootScope.clss = 'background-login'
        }
        else if ($scope.service=='registration'){
            // registration, privacy policy, contact, terms of use
            $rootScope.clss = 'background-single'
        }
        else if ($scope.service=='contactUs'){
            // registration, privacy policy, contact, terms of use
            $rootScope.clss = 'background-single'
        }
        else if ($scope.service=='termsOfUser'){
            // registration, privacy policy, contact, terms of use
            $rootScope.clss = 'background-single'
        }
        else if ($scope.service=='privacyPolicy'){
            // registration, privacy policy, contact, terms of use
            $rootScope.clss = 'background-single'
        }
    	$anchorScroll();

    });




    $scope.$on('Return',function(event,page){
        if (!$scope.history){$scope.history=9;$scope.showLandingPage=$scope.showLandingPage+1}
        $scope.quFlag=$scope.history+0;

      });

  
  });


/*
 * Truncates a string and shows ' ...' at the end if the string has more than a specified number of characters.
 *
 * Usage:
 * {{some_text | cut:true:100:' ...'}}
 *
 * Options:
 * wordwise (boolean)               - if true, cut only by words bounds,
 * max (integer)                    - max length of the text, cut to this number of chars,
 * tail (string, default: ' ...')     - add this string to the input string if the string was cut.
 *
 * http://stackoverflow.com/questions/18095727/how-can-i-limit-the-length-of-a-string-that-displays-with-when-using-angularj
 *
 * TODO: This filter should be moved to a utility module.
 */
dhcApp.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
          }
        }

        return value + (tail || ' ...');
      };
  });

dhcApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});