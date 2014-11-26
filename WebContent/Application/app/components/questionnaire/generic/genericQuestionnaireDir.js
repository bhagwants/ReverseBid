'use strict';

angular.module('genericQuestionnaireDir', []).
directive('genericQuestionnaireDir', function($http,$modal,$rootScope,$sce) {
	
	
    function linker(scope){
    	scope.answers={};
    	scope.$on("Input",function(event,id,value){
        	if (value){
        		scope.answers[id]=value
        	}
        	if (id=="6501" ){
        		if(value=="650101"){scope.hidequestion=false}
        		else{scope.hidequestion=true}
        	}
        	}
        	);
    	scope.sendBack=function(){
    		var command=$rootScope.commandback;
    		command=addApplicationID(command);	
    		$http({
    			url:url,
    			data:command,
    			method:"POST"
    		}).then(function(res){
        		scope.$parent.execute("cancel");
	
    		})
    		
        }
    	scope.assessment=function(){
    		var command={"id":"710","uniqueIdentifier":"assessment"};
    		command=addApplicationID(command);	
    		
    		var formResult={"submitCommand":command,"formData":{"formFields":[],"formId":"","destinationBean":""}};
    		var errorFlag=false;
    		var item
            for (var i=0; i<scope.content.formSections[0].items.length;i++) {
            	
            	item=scope.content.formSections[0].items[i].id;
            	if(item==null){continue}
            	if (item in scope.answers && scope.answers[item]){
            		formResult['formData']['formFields'].push({"fieldName": item, "fieldData": scope.answers[item], "dataType": "String"});
            		scope.content.formSections[0].items[i].errorMessage=null;
            	}
            	else{
            		scope.content.formSections[0].items[i].errorMessage="The answer is mandatory";
            		errorFlag=true;
            	}
            }
            if(errorFlag){
            	return
            }
            $http({
            	url:submitFormUrl,
            	method:"POST",
            	data:formResult
            }).then(function(res){
            	
            	scope.page.id="41001";
            	scope.page=addApplicationID(scope.page);	
            	$http({
        			url:url,
        			data:scope.page,
        			method:"POST"
        		}).then(function(res){
        			
        			window.location.replace("#myGoals");
        			scope.$parent.execute("cancel");
            			
        			
        		})
            })
    		
    		
    		return
    		
        }
    	if (scope.page.uniqueIdentifier=="takeActionMessage"){
    		
    		$http.get("_data/components/dialog/actionMessageEsessionNovo.json",{timeout: 30000, cache: false}).then(function(res){
    			scope.content=res.data
    			scope.content.closeButton=true;
    		})
    		return
    	}
    	else if (scope.page.uniqueIdentifier=="takeActionReminderMessage"){
    		$http.get("_data/components/dialog/Novo.json",{timeout: 30000, cache: false}).then(function(res){
    			scope.content=res.data[scope.page.uniqueIdentifier]
    			scope.content.confirmButton=true;
                scope.noTitle=true
    		})
    		return
    	}
    	else if (scope.page.uniqueIdentifier=="addedAction"){
    		
    		$http.get("_data/components/dialog/Novo.json",{timeout: 30000, cache: false}).then(function(res){
    			scope.content=res.data[scope.page.uniqueIdentifier]
    			scope.content.closeButton=true;
                scope.noTitle=true
    		})
    		return
    	}
    	else if (scope.page.uniqueIdentifier=="Congrats" ){
    		
    		$http.get("_data/components/dialog/Manulife.json",{timeout: 30000, cache: false}).then(function(res){
    			scope.content=res.data[scope.page.uniqueIdentifier]
    			scope.content.sendBack=true;
                scope.noTitle=true
    		})
    		return
    	}
    	else if (scope.page.uniqueIdentifier=="RemoveTracker" ){
    		
    		$http.get("_data/components/dialog/Novo.json",{timeout: 30000, cache: false}).then(function(res){
    			scope.content=res.data[scope.page.uniqueIdentifier]
    			scope.content.showYesNo=true;
                scope.noTitle=true
    		})
    		return
    	}
    	else if (scope.page.uniqueIdentifier=="addtoMyAchievements" ){
    		
    		$http.get("_data/components/dialog/Novo.json").then(function(res){
    			scope.content=res.data[scope.page.uniqueIdentifier]
    			scope.content.closeButton=true;
                scope.noTitle=true
    		})
    		return
    	}
    	else if (scope.page.uniqueIdentifier=="RemoveAction" ){
    		
    		$http.get("_data/components/dialog/Novo.json").then(function(res){
    			scope.content=res.data[scope.page.uniqueIdentifier]
    			scope.content.showYesNo=true;
                scope.noTitle=true
    		})
    		return
    	}
    	else if (scope.page.uniqueIdentifier=="Kindness" ||scope.page.uniqueIdentifier=="kindness"){
    		
    		$http.get("_data/components/dialog/Manulife.json").then(function(res){
    			scope.content=res.data[scope.page.uniqueIdentifier]
    			scope.content.closeButton=true;
    		})
    		return
    	}
    	else if (scope.page.uniqueIdentifier=="updatePhone"){
    		
    		$http.get("_data/components/dialog/Novo.json").then(function(res){
    			scope.content=res.data[scope.page.uniqueIdentifier]
    			scope.content.closeButton=true;
    		})
    		return
    	}
    	else if (scope.page.uniqueIdentifier=="comingSoon" ){
    		
    		$http.get("_data/components/dialog/Novo.json").then(function(res){
    			scope.content=res.data[scope.page.uniqueIdentifier]
    			scope.content.closeButton=true;
                scope.noTitle=true
    		})
    		return
    	}
    	else if(scope.page.id=="goalQuestionnaire"){
    		$http.get("_data/components/questionnaire/goalAssesment.json")
    		.then(function(res){
    			scope.content=res.data[scope.page.uniqueIdentifier];
    			scope.commandGoalAssessment=true;
    			
    		})
    		return
    	}
    	if (scope.page.id=="13" || scope.page.id=="10"){scope.showGetStarted=true}
    	scope.page=addApplicationID(scope.page);	
    	
    	$http({
            	url:url,
            	method:"POST",
            	data:scope.page
            })
                .then(function(res){
                	checkLogin(res,$rootScope)
                    scope.content=res.data.data[0];
                	if (application=="Novo" && scope.page.id=="11" && (scope.page.uniqueIdentifier=="ECS_NUTRITIONFACTS" || scope.page.uniqueIdentifier=="ECS_T1_LABEL_READING") ){
            			scope.showSidePicture="_assets/img/novo/NutritionFacts_AV.jpg"    // this is for Novo Reading a Nutrition Facts Label e-session (quiz 2)
            		}
                	for(var i in scope.content.formSections[0].items){
                		if (application=="Novo" && scope.content.formSections[0].items[i].id=="5607"){
                			scope.content.formSections[0].items[i].label="Here is one week of entries from Mary Ellen's log book:<br><img src='_assets/img/novo/G4M3_PQ2_Table.JPG' style='width:100%'><br> What pattern do you see?";
                		}
                		else if (application=="Novo" && scope.content.formSections[0].items[i].id=="5608"){
                			scope.content.formSections[0].items[i].label="Here is another week of entries from Mary Ellen's log book:<br><img src='_assets/img/novo/G4M3_PQ3_Table.JPG' style='width:100%'><br> What pattern do you see?";
                		}
                		
                		
                		scope.content.formSections[0].items[i].label=(parseInt(i)+1)+". "+scope.content.formSections[0].items[i].label;
                	}
                	if (application=="Novo" && scope.page.id=="10" && scope.page.uniqueIdentifier=="ECS_CHANGING_BEHAVIOR"){
                		scope.hidequestion=true;
                	}
                	
                    scope.bodyData=$sce.trustAsHtml(scope.content.bodyConent);
                });
    	scope.submitQuestionnaire=function(){
    		
    		window.location.replace("#eLearning");
    		scope.$parent.execute('cancel')
    	}
        
        
        scope.execute=function(command){
        	if(command.id=="000"){scope.$parent.execute('cancel');}  // this is just for closing the modal
        	else if (command.id=="sendGoalAssessment"){
        		
        	}
        	else if (command.id=="201"){
        		command=addApplicationID(command);	
            	$http({url:url,
            		data:command,
            		method:"POST"
            	}).then(function (res) { 
            		checkLogin(res,$rootScope);
            		
            		var data={
              			  "moduleId":$rootScope.uniqueIdentifier,
            			  "moduleStatus":"Completed",
            			  "moduleName":$rootScope.title 
            			};
            		$http({url:nniReportUrl,
                		data:data,
                		method:"POST"
                	}).then(function(result){
                	})
            		
            		
            		
            		
            		});
        		scope.$parent.execute('cancel');
        	}
        	else if (application=="novo" && command.id=="10" && command.uniqueIdentifier=="ECS_CHANGING_BEHAVIOR"){
        		$rootScope.hideQuestion=true;
        	}
        	else{
        		var Flag=false;
        		var localFlag=false;
        		for(var i in scope.content.formSections[0].items){
        			if(scope.content.formSections[0].items[i].type=="checkBoxGroup"){
        				localFlag=false;
        				for (var j=0;j<scope.content.formSections[0].items[i].options.length;j++){
        					if(scope.content.formSections[0].items[i].options[j].value){
        						localFlag=true;
        					};
        					
        				}
        			  if (!localFlag){
        				  Flag=true;
        				  scope.content.formSections[0].items[i].errorMessage="The answer is mandatory";
        				  }	
        			  else{
        				  scope.content.formSections[0].items[i].errorMessage=null;
        			  }
        			}
        			else if (scope.content.formSections[0].items[i].id in scope.answers && scope.answers[scope.content.formSections[0].items[i].id]){
        				scope.content.formSections[0].items[i].errorMessage="";
        			}
        			else if (scope.content.formSections[0].items[i].id){
        				scope.content.formSections[0].items[i].errorMessage="The answer is mandatory";
        				if (("6501" in scope.answers) && (scope.answers["6501"]=="650102") && application=="Novo" && scope.page.id=="10" && scope.page.uniqueIdentifier=="ECS_CHANGING_BEHAVIOR"){
                    		Flag=false;
                    	}
        				else{
        					Flag=true;
        				}
        					
        			}
        		}
        		
        		if (Flag){return}
        		command=addApplicationID(command);
	        	var formResult={"submitCommand":command,"formData":{"formFields":[],"formId":"","destinationBean":""}};
	            //for (var item=0;item<scope.answers.length;item++) {
	        	//JASON do not change this.
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
	                    scope.content=res.data.data[0];
	                	
	                	if (application=="Novo" && (scope.page.id!="13" && scope.page.id!="10") && scope.content.text.indexOf("This e-coaching session")!=-1){
	                	}
	                	if (application=="Novo" && scope.content.text.indexOf("next e-coaching session")!=-1){
	                		scope.content.text=scope.content.text.replace("next e-coaching session","<a href='#/eLearning' target='_blank'>next e-coaching session</a>")
	                	}
	                	
	                	//scope.content.text=scope.content.text//+"<a href='#eLearning'>e-coaching</a>"
	                	if (!("commands" in scope.content)){
	                		scope.content.commands=[{"title":"Click to Continue","id":"000"}]
	                		scope.showClose=false;
	                		}
	                	else if (scope.content.commands.length==0) {
	                		scope.showClose=true;
	                	}
	                	else {
	                	scope.showClose=false;
	                	}
	                    //scope.bodyData=$sce.trustAsHtml(scope.content.bodyConent);
	                });
        	}
        }
        scope.fetchPage=function(i){scope.currentPage=i;};
       // scope.$watch('currentPage', function(){
         //   $http.get('_data/components/questionnaire/genericQuestionnaire.json')
           // .then(function(res){
             //   scope.questions=res.data['Step'+scope.currentPage];
               // scope.pages=[1,2,3];
//                scope.answers={}
  //          });
        //});

    }
    return {
        restrict: 'A',
        scope:{page: '=page',id:"=id"},
        templateUrl:'components/questionnaire/generic/genericQuestionnaire-tpl.html',
        link:linker
    };
});

