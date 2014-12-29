'use strict';

function item_upload(ss){
	    $(".uploadPlaceHolder").html("<form id ='uploadform' action='/detail/' method='POST' enctype='multipart/form-data'><input id='FLS'   type='file' name='files[]' accept='audio/*|video/*|image/*' multiple onchange='Checkitem();return false'><input id='service' type='text' style='display:none' name='service' value='"+ss+"'><input type='file' accept='image/*' capture='camera' id='capture' style='display:none' ><input name='task' value='multimedia'  style='display:none' ><input type='submit' style='display:none'></form>");
	    $('#FLS').trigger('click');

	}
var crd = angular.module('crd',
	    [
	        'ngRoute',
	        'ui.bootstrap',
	        'ui.bootstrap.timepicker'
	    ]);

function Checkitem(){
	  var data = new FormData($('form#uploadform')[0]);
	  
	    $.ajax({
	        url: '/ReverseBid/api/multimedia/1.0/upload',
	        type: 'POST',
	        data: data,
	        cache: false,
	        dataType: 'json',
	        processData: false, // Don't process the files
	        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
	        success: function(data, textStatus, jqXHR)
	        {
	        	if(typeof data.error === 'undefined')
	        	{
	        		// Success so call function to process the form
	        		submitForm(event, data);
	        		console.log('success')
	        	}
	        	else
	        	{
	        		// Handle errors here
	        		console.log('ERRORS: ' + data.error);
	        	}
	        },
	        error: function(jqXHR, textStatus, errorThrown)
	        {
	        	// Handle errors here
	        	console.log('ERRORS: ' + textStatus);
	        	// STOP LOADING SPINNER
	        }
	    });
	  return
    var ff = new FormData($('form#uploadform')[0]);
    $("#progressbar").html('<div id="prog"><progress></progress></div>')
    Flag=1;
    
        $.ajax({url: '/detail/',
            type: 'POST',
            xhr: function() {
                myXhr = $.ajaxSettings.xhr();
                if(myXhr.upload){myXhr.upload.addEventListener('progress',progressHandlingFunction, false);}
                return myXhr;
            },
            data:ff,
            cache: false,
            contentType: false,
            processData: false
        }).success(function(data){$('#prog').empty();$('#progressbar').empty();
        			alert("works")
        })
        
        }


var varWindowClass = 'animated fadeIn';

function checkLogin(data,dummy) {

    try {

        if ("authenticated" in data.data && data.data.authenticated === false ) {
            window.location.replace(loginUrl);
        }
    }
    catch (err) {
    }


}

crd.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/mySettings', {template: '<div my-Settings-Page-Dir ng-init="init('+"'mySettings'"+')"></div>'}).
        when('/myMessages', {template: '<div my-Messages-Page-Dir ng-init="init('+"'myMessages'"+')"></div>'}).
        when('/myPatients', {template: '<div my-Patients-Page-Dir ng-init="collapseLocations=true;init('+"'myPatients'"+')"></div>'}).
        when('/changeStore', {template: '<div my-Patients-Page-Dir ng-init="collapseLocations=false;init('+"'myPatients'"+')"></div>'}).
        when('/myProfile', {template: '<div my-Profile-Page-Dir ng-init="init('+"'myProfile'"+')"></div>'}).
        when('/dashboard', {template: '<div dashboard-Page-Dir ng-init="init('+"'dashboard'"+')"></div>'}).
        when('/landingPage', {template: '<div landing-Page-Dir ></div>'}).
        when('/myGoals', {template: '<div my-Goals-Page-Dir ng-init="init('+"'myGoals'"+')"></div>'}).
        when('/detailPage', {template: '<div rich-Item-Detail-Dir ng-init="$parent.quFlag=0"></div>'}).
        when('/contactUs', {template: '<div contact-Us-Dir ng-init="init('+"'contactUs'"+')"></div>'}).
        when('/termsOfUse', {template: '<div terms-Of-Use-Dir ng-init="init('+"'termsOfUser'"+')"></div>'}).
        when('/howItWorks', {template: '<div how-It-Works-Dir ng-init="init('+"'howItWorks'"+')"></div>'}).
        when('/faq', {template: '<div faq-Dir ng-init="init('+"'faq'"+')"></div>'}).
        when('/privacyPolicy', {template: '<div privacy-Policy-Dir ng-init="init('+"'privacyPolicy'"+')"></div>'}).
        otherwise({
            redirectTo: '/'
        });
    }]);


crd.filter('truncate', function () {
    return function (input, length) {
        return (input.length > length ? input.substring(0, length) : input );
    };
});
var ModalInstanceCtrl = function () {
    //this is not required now but can be used later on
};

crd.controller('mainMenu', function ($scope, $modal, $http, $anchorScroll, $templateCache,$location) {
    //$templateCache.removeAll();
	$scope.updateLeftMenu=function(){
				$http.get(leftMenuUrl).then(function(res){
					checkLogin(res,"");
					$scope.leftMenu=res.data;
					try{
						$scope.currentStoreId=res.data.profile.currentStoreId;
					}
					catch(err){}
					
					if(!res.data.authenticated && res.data.roles !=null)
					{
						$('body').show();
						if(res.data.roles[0]=="pharmacist"){
							$scope.showStore=true;
							if ($scope.currentStoreId==null){
					        	$location.url("/changeStore");
					        }
			
							$("#storename").html(res.data.profile.currentStoreName);
						}
						$http.get(userDetailUrl).
					    then(function (res) {
					        $scope.name = res.data.userDetails[0];
					    })
					}
			
			
				})
		}
	
	$scope.updateLeftMenu();	
    $scope.leftMenu00 = {
        "profile": {
            "imageUrl": "_assets/img/profile-picture.jpg",
            "imageAlt": "",
            "title": "About me",
            "name": "",
            "service": "myProfile"
        },
        "applications": [
            {
                "service": "dashboard",
                "title": "Dashboard",
                "cssClass": "iconDashboard"
            },

            {
                "service": "myGoals",
                "title": "My Goals",
                "cssClass": "iconMygoals"
            }

        ]
    };

    $scope.$on('addGoals', function (event, page) {
        $scope.history = $scope.quFlag + 0;
        $scope.quFlag = 9;
        $scope.page = page;
    });

    $scope.$on('RichItemDetail', function (event, page) {
        $scope.history = $scope.quFlag + 0
        $scope.quFlag = 0;
        $scope.page = page;


    });
    /*$scope.$on('refresh', function (event, page) {

    	$http.get(userDetailUrl).
        then(function (res) {
            $scope.name = res.data.userDetails[0];
        })

    });*/
    $scope.$on('flipPage', function (event, page) {
        $scope.service = page;


    });

    $scope.init = function (service) {

       
        $anchorScroll();

    };

    $scope.logItOut=function(){
    		$http.get(url_logout).then(function(){
    			window.location.replace(loginUrl)
    		})
    }

   
    
    $scope.$on('refreshLeftMenu', function (event) {
    	$scope.updateLeftMenu();
    });
   
   
    $scope.note = 'abcdefghijklmnopqrstuvwxyz';

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
crd.filter('cut', function () {
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

crd.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

crd.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

function dhcAppNavTrickPosition() {
    $('#app-nav-trick').css('left', $('.container-content-parent').position().left + 10);
}
function dhcAppNavTrickReset() {
    $('#app-nav-trick').attr('class','');
}
function dhcAppNavTrickChange(strClass) {
    $('#app-nav-trick').attr('class','app-nav-trick '+ strClass);
}

$(function () {
    if ($('#app-nav-trick').length > 0) {
        dhcAppNavTrickPosition();

        window.onresize = function () {
            dhcAppNavTrickPosition();
        }
    }
    //serviceFinder();
    //$("#logout").attr("href", address + appName + "/api/logout/1.0")
})
