'use strict';

angular.module('peaqCardinalDir', []).
directive('peaqCardinalDir', function($http,$modal,$rootScope) {
    function linker(scope){
    	scope.answerpeaq={};
    	
    	$http({
    		url:url,
        	method:"POST",
        	data:scope.page
    	})
    	//$http.get("_data/components/questionnaire/peaq.json")
        .then(function(res){
        	console.log(res.data.data[0])
        	checkLogin(res,$rootScope);
        	scope.title=res.data.data[0].title;
        	$http.get("_data/components/questionnaire/peaqCardinal.json").then(function(data){
        		scope.text=data.data.pageText[0];
        	})
        	
        	scope.content=res.data.data[0].formSections[0];
        	//scope.content=res.data[0].formSections[0];
        	scope.currentQuestion=0;
        	scope.item=scope.content.items[scope.currentQuestion]
            
        });
        scope.$on("Input",function(event,id,value){
            	scope.answerpeaq[id]=value
            	});
        scope.cancelRequest=function(){
        	//scope.showCancelMessage=!scope.showCancelMessage;
        	       	scope.$parent.execute('cancel')
        }
        scope.closePage=function(command){
        	console.log("endofPeaQ");
        	console.log(command)
        	scope.$emit("getgoals",command);
        	console.log("done");
        }
        scope.fetchPastQuestion=function(answer,id){
        	scope.currentQuestion=scope.currentQuestion-1;
        	if (scope.currentQuestion<scope.content.items.length){
        		scope.item=scope.content.items[scope.currentQuestion];
        		console.log(scope.item.options[0]);
        		scope.item.answers=scope.answerpeaq[scope.item.id];
        		$http.get("_data/components/questionnaire/peaqCardinal.json").then(function(data){
            		scope.text=data.data.pageText[scope.currentQuestion];
            	})
            }
        }
        scope.fetchNextQuestion=function(answer,id){
        	console.log(scope.item.options[0]);
        	
        	if (!(scope.item.id in scope.answerpeaq)){
        		
        		scope.item.errorMessage="Please answer the question."
        			
        	}
        	else {
	        		
	        	
	        	scope.currentQuestion=scope.currentQuestion+1;
	        	if (scope.currentQuestion<scope.content.items.length){
	        		scope.item=scope.content.items[scope.currentQuestion]
	        		$http.get("_data/components/questionnaire/peaqCardinal.json").then(function(data){
	            		scope.text=data.data.pageText[scope.currentQuestion];
	            	})
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
	                    	scope.previewCommands=[]
	                    	scope.feedback=true;
	                    	scope.content=res.data.data[0];
	                    	console.log(scope.content)
	                    	scope.feedbackCommand=res.data.data[0].commands[0];
	                    	scope.peaqskills=[];
	                    	scope.text="Based on what you've told us, we'd like to show you how you're doing in 3 key health areas:";
	                    	scope.hideCounter=true;
	                    	for(var i in scope.content.items[0].items){
	                    			scope.bodyTitle=scope.content.items[0].items[i].title;
	                    			scope.bodySubTitle=scope.content.items[0].items[i].subTitle
	                    			
	                    				var name=scope.content.items[0].items[i].items[0].value;
	                    				var score=parseInt(scope.content.items[0].items[i].items[1].value)-1
	                    				scope.peaqskills.push({"value":name,"imagePrefix": name.replace(" ","-").toLowerCase(),"score":score}) 
	                    	}
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
        scope:{page: '=page'},
        templateUrl:'components/questionnaire/peaqCardinal/peaqCardinal-tpl.html',
        link:linker
    };
});

