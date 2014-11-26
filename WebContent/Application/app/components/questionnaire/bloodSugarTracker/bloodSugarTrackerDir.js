'use strict';

angular.module('bloodSugarTrackerDir', []).
directive('bloodSugarTrackerDir', function($http,$modal,$rootScope) {
	
	
    function linker(scope){
    	scope.answers={};
    	scope.u=$rootScope.uniqueIdentifier
    	//$http({
       //     	url:url,
         //   	method:"POST",
           // 	data:scope.page
         //   })
           //     .then(function(res){
             //   	checkLogin(res,$rootScope)
               //     scope.content=res.data.data[0];
                    //scope.bodyData=$sce.trustAsHtml(scope.content.bodyConent);
            //    });
    	scope.submitQuestionnaire=function(){
    		
    		window.location.replace("#eLearning");
    		scope.$parent.execute('cancel')
    	}
        scope.$on("Input",function(event,id,value){
        	scope.answers[id]=value
        	});
        scope.execute=function(command){
        	if(command.id=="000"){scope.$parent.execute('cancel');return}
        	var formResult={"submitCommand":{'id':"700","uniqueIdentifier":$rootScope.uniqueIdentifier},"formData":{"formFields":[],"formId":"","destinationBean":""}};
            for (var item in scope.answers) {
            	formResult['formData']['formFields'].push({"fieldName": item, "fieldData": scope.answers[item], "dataType": "String"});
            }

            $http({
            	url:submitFormUrl,
            	method:"POST",
            	data:formResult
            })
                .then(function(res){
                	checkLogin(res,$rootScope)
                    scope.$parent.execute('cancel');
                	
                    //scope.bodyData=$sce.trustAsHtml(scope.content.bodyConent);
                });
        	
        }
        scope.fetchPage=function(){
        	

        	switch(scope.currentPage){
        		case 1:
        			if ('howOften' in scope.answers && scope.answers['howOften'])
        			{
        				var reminder=[];
        				var dat
        				for(var i=1;i<4;i++){
        					if (i<=scope.answers['howOften']){
        						//item.value.getHours+':'+item.value.getMinutes()
        						console.log(scope.pageContent.timers[i-1].value)
        						dat=new Date(scope.pageContent.timers[i-1].value)
        						
        						scope.answers['timer'+i]=(dat.getHours()>12?dat.getHours()-12:dat.getHours()) +":"+(dat.getMinutes()<10 ? "0"+dat.getMinutes():dat.getMinutes())+(dat.getHours()>12? " PM":" AM");
        						scope.answers['timerStamp'+i]=scope.pageContent.timers[i-1].value;
        						reminder.push({"label":scope.answers['timer'+i],"items": [{"type":"checkbox","label":"text reminder","id":"textReminder"+i},{"type":"checkbox","label":"e-mail reminder","id":"emailReminder"+i}]})
        					}
        					else {
        						delete scope.answers['timer'+i];
        					}
        				}
        				scope.currentPage+=1;
        				scope.reminderOptions=reminder;
        				}
        			else{
        				scope.pageContent.showMessage=true;
        				
        			}
        			break;
        		case 2:
        			scope.emailReminder=false;
        			scope.textReminder=false;
        			for (var i in scope.answers){
        				if (i.indexOf("emailReminder") > -1 && scope.answers[i])
        					{
        					scope.emailReminder=true;
        					}
        				else if (i.indexOf("textReminder") > -1  && scope.answers[i])
    						{scope.textReminder=true
        					}
        			}
        			(scope.emailReminder || scope.textReminder)? scope.currentPage+=1: scope.pageContent.showMessage=true;
        			break;
        		case 3:
        			try{
        				scope.pageContent.items[2]
        			}
        			catch(err){break}
        			scope.answers.telephone=scope.pageContent.items[2].value1+'-'+scope.pageContent.items[2].value2+'-'+scope.pageContent.items[2].value3;
        			scope.currentPage+=1;
        			break;
        		case 4:
        			scope.currentPage+=1;
        			break;
        		case 5:
        			scope.$parent.execute('cancel');
    				
        	}
        	return
        	scope.currentPage=i;
        	
        
        };
        scope.$watch('currentPage', function(){
        	

            $http.get('_data/components/questionnaire/' + $rootScope.uniqueIdentifier + '.json')
            .then(function(res){
                scope.pageContent=res.data['Step'+scope.currentPage];
                
                if (scope.currentPage==4){scope.pageContent.text1=scope.pageContent.text11+scope.answers.telephone+scope.pageContent.text12}
                                
            });
        });

    }
    return {
        restrict: 'A',
        scope:{page: '=page'},
        templateUrl:'components/questionnaire/bloodSugarTracker/bloodSugarTracker-tpl.html',
        link:linker
    };
});

