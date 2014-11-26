'use strict';

angular.module('trackerDir', []).
directive('trackerDir', function($http,$modal,$rootScope) {
	
	
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
    	scope.answers={};
    	
    	scope.uniqueIdentifier=$rootScope.uniqueIdentifier

    	scope.submitQuestionnaire=function(){
    		
    		window.location.replace("#eLearning");
    		scope.$parent.execute('cancel')
    	}
        scope.$on("Input",function(event,id,value){
        	
        	if(id=="textReminder" && "setTextReminder" in scope.answers){
        		scope.answers["setTextReminder"]=value
        	}
        	else if(id=="emailReminder" && "setEmailReminder" in scope.answers){
        		scope.answers["setEmailReminder"]=value
        	}
        	else {
        		scope.answers[id]=value
        	}
        	//if(scope.uniqueIDentifier){}
        	});
        scope.execute=function(command){
        	//if(command.id=="000"){scope.$parent.execute('cancel');return}
        	scope.hideClose=true;
        	if(command=="cancel"){
        		scope.$parent.execute('cancel');
        		return
        	}
        	
        	var d = new Date();
        	var timeZone=d.getTimezoneOffset();
        	if(command=="cancel" && scope.currentPage<1){scope.$parent.execute('cancel');return}
        	var data={'id':"700","uniqueIdentifier":$rootScope.uniqueIdentifier};
        	data=addApplicationID(data);	

        	var formResult={"submitCommand":data,"formData":{"formFields":[],"formId":"","destinationBean":""}};
            for (var item in scope.answers) {
            	formResult['formData']['formFields'].push({"fieldName": item, "fieldData": scope.answers[item], "dataType": "String"});
            }
            formResult['formData']['formFields'].push({"fieldName": "timeZone", "fieldData": timeZone, "dataType": "String"});
            //scope.$parent.execute('cancel');
            
            $http({
            	url:submitFormUrl,
            	method:"POST",
            	data:formResult
            })
                .then(function(res){
                	checkLogin(res,"");
                	scope.$parent.execute('cancel');
                	
                });
        	
        }
        scope.fetchPage=function(){
        	        	switch(scope.currentPage){
        		case 1:
        			if ('howOften' in scope.answers && scope.answers['howOften'])
        			{
        				var reminder=[];
        				var dat
        				var label;
        				for(var i=1;i<4;i++){
        					if (i<=scope.answers['howOften']){
        						//item.value.getHours+':'+item.value.getMinutes()
        						dat=new Date(scope.pageContent["timers"+scope.answers['howOften']][i-1].value)
        						
        						scope.answers['timer'+i]=(dat.getHours()>12?dat.getHours()-12:dat.getHours()) +":"+(dat.getMinutes()<10 ? "0"+dat.getMinutes():dat.getMinutes())+(dat.getHours()>=12? " <small>PM</small>":" <small>AM</small>");
        						scope.answers['timerStamp'+i]=scope.pageContent["timers"+scope.answers['howOften']][i-1].value;
        						reminder.push({"label":scope.answers['timer'+i],"items": [{"type":"checkbox","label":"text reminder","id":"textReminder"+i},{"type":"checkbox","label":"e-mail reminder","id":"emailReminder"+i}]})
        					}
        					else {
        						delete scope.answers['timer'+i];
        					}
        				}
        				//if (scope.task=='changeDose'){
        			//		scope.execute();
        			//	}
        				scope.currentPage+=1;
        				scope.loadpage();
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
        				if (i.indexOf("mailReminder") > -1 && (scope.answers[i]=="true" || scope.answers[i]==true))
        					{
        					scope.emailReminder=true;
        					scope.answers.setEmailReminder=true;
        					}
        				else if (i.indexOf("extReminder") > -1  && (scope.answers[i]==true|| scope.answers[i]=="true"))
    						{
        					scope.textReminder=true;
        					scope.answers.setTextReminder=true;
        					}
        			}
        			if(!scope.emailReminder && !scope.textReminder){
        				scope.pageContent.showMessage=true;
        				return
        			}
        			else{
        				scope.lastStep=(scope.emailReminder)? 5:4;  
            			(scope.emailReminder || scope.textReminder)? ((scope.textReminder)?scope.currentPage+=1:scope.currentPage+=3): scope.pageContent.showMessage=true;
            			scope.loadpage();
            				
        			}
        			break;
        		case 3:
        			
        			if("agreeReceiveMarketingText" in scope.answers && scope.answers.agreeReceiveMarketingText){
        				scope.pageContent.items[0].errorMessage=null;
        				var isNum=isNumeric(scope.pageContent.items[2].value3)&&isNumeric(scope.pageContent.items[2].value2)&&isNumeric(scope.pageContent.items[2].value1);
            			
	        			if (isNum && Number(scope.pageContent.items[2].value1)<1000 && Number(scope.pageContent.items[2].value1)>99 && Number(scope.pageContent.items[2].value2)<1000 && Number(scope.pageContent.items[2].value3)<10000){
	        					scope.answers.telephone=scope.pageContent.items[2].value1+'-'+scope.pageContent.items[2].value2+'-'+scope.pageContent.items[2].value3;
	        					scope.currentPage+=1;
	        					scope.pageContent.showMessage=false;
	        					scope.loadpage();
	        			}
	        			else{
	        				
	        				scope.pageContent.errorMessage="Wrong phone number format. Please use ANN-NNN-NNNN, where A is a number between 2 and 9 and N is a number between 0 and 9."
	        				scope.pageContent.showMessage=true;	
	        			}
        			}
        			else{
        				scope.pageContent.items[0].errorMessage="Agreement to have text messages sent is mandatory."
        				
        			}
        			break;
        		case 4:
        			scope.currentPage+=1;
        			scope.loadpage();
        			break;
        		case 5:
        			scope.$parent.execute('cancel');
    				
        	}
        	return
        	
        
        };
        if(scope.task && scope.task!='changeDose'){
        	scope.answers=$rootScope.dataMap;
        	scope.currentPage=2;
        	
				
        	
        }
        
        scope.sendOptSMS=function(){
    		$http({url:optSMSurl,
        		data:{},
        		method:"POST"
        	}).then(function (res) {
    		alert("Request sent!")})
    	}
		$http.get(userStatusUrl).then(function(res){
	  		if(res.data.data[0].smsDoubleOptIn==false){
	  			scope.smsDoubleOptIn=true;
	  			}
	  		                		
		  	})
	
	    

        scope.loadpage=function(){
            $http.get('_data/components/questionnaire/' + $rootScope.uniqueIdentifier + '.json')
            .then(function(res){
            	
                scope.pageContent=res.data['Step'+scope.currentPage];
                
                
                if(scope.currentPage==2){
                	if(scope.$parent.dataMap){
                    	var reminder=[];
            			var dat
            			var label;
            			dat=new Date(scope.answers.timerStamp)
            			scope.answers['timer']=(dat.getHours()>12?dat.getHours()-12:dat.getHours()) +":"+(dat.getMinutes()<10 ? "0"+dat.getMinutes():dat.getMinutes())+(dat.getHours()>12? " <small>PM</small>":" <small>AM</small>");
            			reminder.push({"label":scope.answers['timer'],"items": [{"type":"checkbox","label":"text reminder","id":"textReminder","value":scope.answers["setTextReminder"]},{"type":"checkbox","label":"e-mail reminder","id":"emailReminder","value":scope.answers["setEmailReminder"]}]})
            			scope.answers.UUID=scope.$parent.dataMap.id;
                		scope.reminderOptions=reminder;
            			}
                	else{
                		
                		var reminder=[];
	    				var dat
	    				var label;
    					
	    				for(var i=1;i<4;i++){
	    					
	    					if (i-1<=parseInt(scope.answers['howOften']) && scope.answers['timer'+i]){
	    						
	    						//dat=new Date(scope.answers["timers"+scope.answers['howOften']][i-1].value)
	    						
	    						//scope.answers['timer'+i]=(dat.getHours()>12?dat.getHours()-12:dat.getHours()) +":"+(dat.getMinutes()<10 ? "0"+dat.getMinutes():dat.getMinutes())+(dat.getHours()>12? " <small>PM</small>":" <small>AM</small>");
	    						
	    						reminder.push({"label":scope.answers['timer'+i],"items": [{"type":"checkbox","label":"text reminder","id":"textReminder"+i},{"type":"checkbox","label":"e-mail reminder","id":"emailReminder"+i}]})
	    					}
	    					else {
	    						delete scope.answers['timer'+i];
	    					}
	    				}
                	}	
    				//if (scope.task=='changeDose'){
    			//		scope.execute();
    				//}
    				scope.reminderOptions=reminder;
    				
                }
                
                if (scope.currentPage==3){
        			                	try{
                		scope.hideISI=true;  // to get rid of ISI texts
                		if(scope.$parent.dataMap){
                			scope.pageContent.items[2].value1=scope.answers.telephone.split("-")[0];
                        	scope.pageContent.items[2].value2=scope.answers.telephone.split("-")[1];
                        	scope.pageContent.items[2].value3=scope.answers.telephone.split("-")[2];
                        	scope.pageContent.items[0].value=scope.answers.agreeReceiveMarketingText;
                		}
                		else{
                			$http.get(userStatusUrl).then(function(res){

                		        checkLogin(res,"")
                		        scope.answers.telephone=res.data.data[0].telephone;
                		        if(res.data.data[0].telephone.indexOf("-")!=-1){
                		        	scope.pageContent.items[2].value1=scope.answers.telephone.split("-")[0];
                                	scope.pageContent.items[2].value2=scope.answers.telephone.split("-")[1];
                                	scope.pageContent.items[2].value3=scope.answers.telephone.split("-")[2];
                		        }
                		        
                			}) 	
                		}
                		
                	}
                	catch(err){
                		
                	}
                	}
                else if (scope.currentPage==4){
                	scope.hideISI=true;  // to get rid of ISI texts
                	scope.pageContent.text1=scope.pageContent.text11+scope.answers.telephone+scope.pageContent.text12}
                else if(scope.currentPage==5){
                	scope.hideISI=true;  // to get rid of ISI texts
                	if(scope.$parent.dataMap){
            			scope.pageContent.text1=scope.pageContent.text1.replace("[email@email.com]",scope.answers.email);
            		}
                	else{
                		$http.get(userStatusUrl).then(function(res){

            		        checkLogin(res,"")
            		        scope.answers.email=res.data.data[0].email;
            		        scope.pageContent.text1=scope.pageContent.text1.replace("[email@email.com]",scope.answers.email);
                		})
                	}
                	
            	}                
            });
        };
        if($rootScope.uniqueIdentifier){
        	$http.get(getRemindersUrl+$rootScope.uniqueIdentifier)
            .then(function(res){
            	checkLogin(res,"");
            	var dataMap={};
            	for(var j=0;j<res.data.length;j++){
            		for(var i=0;i<res.data[j].formFields.length;i++){
            			
	        			dataMap[res.data[j].formFields[i].fieldName]=res.data[0].formFields[i].fieldData;
	        			
	        		}
            	}
	        		
            	//scope.$parent.dataMap=dataMap;
            	scope.loadpage();
            })    
        } 
        else{
        	scope.loadpage();
        }
        
    }
    return {
        restrict: 'A',
        //scope:{page: '=page'},
        templateUrl:'components/questionnaire/tracker/tracker-tpl.html',
        link:linker
    };
});

