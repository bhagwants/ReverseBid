'use strict';

angular.module('reminderConfigurationNovoDir', []).
directive('reminderConfigurationNovoDir', function($http,$modal,$rootScope) {
	
	
    function linker(scope){
    	$http.get(myPreferencesUrl)
	       .then(function(res){
	    	   checkLogin(res,"")
            scope.reminderList=res.data.data[0];
		    	$http.get(userStatusUrl).then(function(res){
     		if(res.data.data[0].smsDoubleOptIn==false){
     			scope.smsDoubleOptIn=true;
     			}
     		if(res.data.data[0].globalOptOut==true){
     			scope.globalOptOut=true;
     			}
     		
     	})

          });
    	function isNumeric(value) {
    	    return /^\d+$/.test(value);
    	}
		$http.get(userStatusUrl).then(function(res){
	  		if(res.data.data[0].smsDoubleOptIn==false){
	  			scope.smsDoubleOptIn=true;
	  			}
	  		                		
		  	})

    	scope.currentPage=(scope.page.id=="")? 0:scope.page.id;
    	scope.answers={"setTextReminder":false,"setEmailReminder":false,"day":"","timer":"","telephone":"","agreeReceiveMarketingEmail":false};
    	try{
    		if(scope.$parent.dataMap.id){
    			scope.answers=scope.$parent.dataMap
    		}
    		
    	}
    	catch(err){
    		
    	}
    	scope.u=$rootScope.uniqueIdentifier
    	
    	scope.submitQuestionnaire=function(){
    		
    		window.location.replace("#eLearning");
    		scope.$parent.execute('cancel')
    	}
        scope.$on("Input",function(event,id,value){
        	if(id=="timer"){
        		var dat=new Date(value);
        		scope.answers["timerStamp"]=value;
        		scope.answers['timer']=(dat.getHours()>12?dat.getHours()-12:dat.getHours()) +":"+(dat.getMinutes()<10 ? "0"+dat.getMinutes():dat.getMinutes())+(dat.getHours()>12? " <small>PM</small>":" <small>AM</small>");
        	}
        	else {
        		scope.answers[id]=value
        	}
        	scope.showMore=(scope.answers['setTextReminder']==true || scope.answers['setEmailReminder']==true || scope.answers['setTextReminder']=='true' || scope.answers['setEmailReminder'] =='true' )? true:false;
        	});
        scope.execute=function(command){
        	scope.hideClose=true;
        	var d = new Date();
        	var timeZone=d.getTimezoneOffset();
        	var data={'id':"105","uniqueIdentifier":scope.page.uniqueIdentifier,"businessObjectOwner":scope.page.businessObjectOwner};
        	data=addApplicationID(data);	
        	
        	var formResult={"submitCommand":data,"formData":{"formFields":[],"formId":"","destinationBean":""}};
            for (var item in scope.answers) {
            	formResult['formData']['formFields'].push({"fieldName": item, "fieldData": scope.answers[item], "dataType": "String"});
            }
            formResult['formData']['formFields'].push({"fieldName": "timeZone", "fieldData": timeZone, "dataType": "String"});
            $http({
            	url:submitFormUrl,
            	method:"POST",
            	data:formResult
            })
                .then(function(res){
                	checkLogin(res,"");
                	scope.$parent.execute('cancel');
                	
                    //scope.bodyData=$sce.trustAsHtml(scope.content.bodyConent);
                });
        	
        }
        scope.fetchPage=function(command){
        	scope.currentPage=parseInt(scope.currentPage)
        	switch(scope.currentPage){
	        	case 0:
					scope.currentPage=1;
					scope.updatePage();
					break;
	        	case 1:
	        		if(scope.answers["howOften"]==""){
	        			scope.pageContent.errorMessage="Please select at lease one of the reminders, above."
	        		}
	        		else if ('setTextReminder' in scope.answers && (scope.answers['setTextReminder']=="true" ||scope.answers['setTextReminder']==true))
        			{
        				scope.currentPage+=1;
        				scope.updatePage();
        				//scope.reminderOptions=reminder;
        			}
        			else if ( 'setEmailReminder' in scope.answers && (scope.answers['setEmailReminder']=="true" || scope.answers['setEmailReminder']==true)){
        				scope.currentPage+=3;//Paul
        				scope.updatePage()
        			}
        			else {
        				scope.pageContent.errorMessage="Please select at lease one of the reminders, above."
        				//scope.$parent.execute('cancel');
        			}
        			break;
        		case 2:
        			var num1=parseInt(scope.pageContent.items2[2].value1);
        			var num2=parseInt(scope.pageContent.items2[2].value2);
        			var num3=parseInt(scope.pageContent.items2[2].value3);
        			var isNum=isNumeric(scope.pageContent.items2[2].value3) && scope.pageContent.items2[2].value1.toString().length==3 && scope.pageContent.items2[2].value2.toString().length==3 && scope.pageContent.items2[2].value3.toString().length==4 &&isNumeric(scope.pageContent.items2[2].value2)&&isNumeric(scope.pageContent.items2[2].value1);
        			var condition=(num1<1000 && num1>99) && (num2<1000 && num2>-1) && (num3<10000 && num3>-1)
        			if (!condition || !isNum){
        				scope.showError=true;
        				break;
        			}
        			else{
        				scope.showError=false;
        			}
        			scope.answers.telephone=scope.pageContent.items2[2].value1+'-'+scope.pageContent.items2[2].value2+'-'+scope.pageContent.items2[2].value3;
        			if (!scope.pageContent.items2[0].value){
        				scope.pageContent.items2[0].errorMessage="Agreement to have text messages sent is mandatory.";
        				break
        			}
        			else {
        				scope.pageContent.items2[0].errorMessage=null;
        			}
        			if(scope.answers['setTextReminder']=="true" || scope.answers['setTextReminder']==true){
        				scope.currentPage+=1;
        				scope.updatePage();
        			}
        			else if (scope.answers['setEmailReminder']=="true" || scope.answers['setEmailReminder']==true)
        				{scope.currentPage+=2;
        				scope.updatePage();
        				}
        			else {scope.$parent.execute('cancel');}
        			
        			break;
        		case 3:
        			if (scope.answers['setEmailReminder']==true || scope.answers['setEmailReminder']=="true"){
        				scope.currentPage+=1;
        				scope.updatePage();
        			}
        			else{
        				scope.execute(command);
        				scope.$parent.execute('cancel');
        			}
        				
        			
        			break;
        		case 4:
        			scope.execute(command)
        			scope.$parent.execute('cancel');
    				
        	}
        	return
        	
        	
        
        };
        scope.updatePage=function(){
        	
        	if(scope.currentPage=="edit"){
        		scope.currentPage=1;
        	}
            $http.get('_data/components/questionnaire/reminderNovo.json')
            .then(function(res){
            	if (scope.currentPage==1){
            		if(scope.$parent.dataMap){
            			scope.answers=scope.$parent.dataMap;
            			scope.answers.UUID=scope.$parent.dataMap.id;
                		var howOften=parseInt(scope.$parent.dataMap.howOften)
                		var day=parseInt(scope.$parent.dataMap.day)
                		res.data['Step'+scope.currentPage].items[0].value=scope.answers['setTextReminder'];
                		res.data['Step'+scope.currentPage].items[1].value=res.data['Step'+scope.currentPage].items[1].options[howOften];
                		res.data['Step'+scope.currentPage].items[2].value=res.data['Step'+scope.currentPage].items[2].options[day];
                		res.data['Step'+scope.currentPage].items[3].value=scope.answers['timerStamp'];
                		res.data['Step'+scope.currentPage].items[5].value=scope.answers['setEmailReminder'];
                		res.data['Step'+scope.currentPage].items[4].value=scope.answers['date'];
            		}
            		
            	}
            	scope.pageContent=res.data['Step'+scope.currentPage];
            	try{
            		scope.pageContent.errorMessage=null;
            	}
            	catch(err){}
                
                if (scope.currentPage==2){
                	$http.get(userStatusUrl).then(function(res){

        		        checkLogin(res,"")
        		        scope.answers.telephone=res.data.data[0].telephone;
        		        if(res.data.data[0].telephone!=null && res.data.data[0].telephone.indexOf("-")!=-1){
        		        	scope.pageContent.items2[2].value1=scope.answers.telephone.split("-")[0];
                        	scope.pageContent.items2[2].value2=scope.answers.telephone.split("-")[1];
                        	scope.pageContent.items2[2].value3=scope.answers.telephone.split("-")[2];
                        	
        		        }
        		        
        			}) 	
                	if(scope.answers.agreeReceiveMarketingText){
                		scope.pageContent.items2[0].value=scope.answers['agreeReceiveMarketingText'];
                	}
                }
                else if (scope.currentPage==3){
                	scope.pageContent.text1=scope.pageContent.text11+scope.answers.telephone+scope.pageContent.text12}
                else if(scope.currentPage==4){
                	scope.pageContent.text1=scope.pageContent.text1.replace("[email@email.com]",$("#email").html());
            	}
                if(isNumeric(scope.currentPage)==false){scope.currentPage=0}
                                
            });
        };
    if(scope.page.uniqueIdentifier){
    	$http.get(getRemindersUrl+scope.page.uniqueIdentifier)
        .then(function(res){
        	checkLogin(res,"");
        	var dataMap={};
        	try{
        		for(var i=0;i<res.data[0].formFields.length;i++){
        			dataMap[res.data[0].formFields[i].fieldName]=res.data[0].formFields[i].fieldData;
        			
        		}
        	}
        	catch(err){
        		
        	}
    		
        	scope.$parent.dataMap=dataMap;
        	scope.updatePage();
        })    
    } 
    else{
    	scope.updatePage();
    }
    
    
    
    }
    return {
        restrict: 'A',
        scope:{page: '=page'},
        templateUrl:'components/questionnaire/reminderConfigurationNovo/reminderConfigurationNovo-tpl.html',
        link:linker
    };
});

