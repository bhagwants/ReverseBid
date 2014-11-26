'use strict';

angular.module('peaqDir', []).
directive('peaqDir', function($http,$modal,$rootScope) {
    function linker(scope){
    	scope.answerpeaq={};
    	$http.get(peaqQuestionnaireUrl)
    	//$http.get("_data/components/questionnaire/peaq.json")
        .then(function(res){
        	console.log(res)
        	checkLogin(res,$rootScope);
        	scope.title=res.data.data[0].title;
        	scope.subTitle=res.data.data[0].subTitle;
        	scope.content=res.data.data[0].formSections[0];
        	//scope.content=res.data[0].formSections[0];
        	scope.currentQuestion=0;
        	scope.item=scope.content.items[scope.currentQuestion]
            
        });
        scope.$on("Input",function(event,id,value){
            	scope.answerpeaq[id]=value
            	});
        scope.cancelRequest=function(){
        	scope.showCancelMessage=!scope.showCancelMessage;
        	//       	scope.$parent.execute('cancel')
        }
        scope.closePage=function(){
        	$rootScope.$broadcast("sendback");
        	scope.$parent.execute('cancel');
        }
        scope.fetchNextQuestion=function(answer,id){
        	if (!(scope.item.id in scope.answerpeaq)){
        		scope.item.errorMessage="Please answer the question."
        			
        	}
        	else {
	        		
	        	
	        	scope.currentQuestion=scope.currentQuestion+1;
	        	if (scope.currentQuestion<scope.content.items.length){
	        		scope.item=scope.content.items[scope.currentQuestion]
	            }
	            else{
	            	var formResult={"submitCommand":{"id":"710","uniqueIdentifier":"assessment"},"formData":{"formFields":[],"formId":"","destinationBean":""}};
	                for (var item in scope.answerpeaq) {
	                	formResult['formData']['formFields'].push({"fieldName": item,"fieldData": scope.answerpeaq[item],"dataType": "String"});
	                	}
	                $http({
	                	url:submitFormUrl,
	                	method:"POST",
	                	data:formResult
	                })
	                    .then(function(res){
	                    	checkLogin(res,$rootScope);
	                    	scope.title=res.data.data[0].title;
	                    	scope.subTitle=res.data.data[0].text;
	                    	scope.showClose=true;
	                    	scope.item=null;
	                    }
	                )
	                
	                }
	                
	        }	
        }
        

    }
    return {
        restrict: 'A',
        replace: 'true',
        templateUrl:'components/questionnaire/peaq/peaq-tpl.html',
        link:linker
    };
});

