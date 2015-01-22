'use strict';


var crd = angular.module('crd',
	    [
	     	'homeDir',
	     	'legalDir',
	        'ngRoute',
	        'footerDir',
	        'contactUs',
	        'ui.bootstrap',
	    ]);

crd.config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider.
                when('/', {template: '<div home-Dir ></div>'}).
                otherwise({
                    redirectTo: '/'
                });
            }]);

