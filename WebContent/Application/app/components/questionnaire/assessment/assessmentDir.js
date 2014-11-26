'use strict';

angular.module('assessmentDir', []).
directive('assessmentDir', function($http,$modal,$rootScope,$location) {
	
	
    function linker(scope){
    	if($("#isAssessed").html()=="true"){
    		if ((window.location.href.indexOf("landingPage")!=-1 && $rootScope.showeLearningLandingPage!=true) || window.location.href.indexOf("myProfile")!=-1){
    			scope.currentPage=1;
    		}
    		else{
    			scope.currentPage=4;
    		}
    		
    	}
    	else {scope.currentPage=0}
    	scope.answers={};
    	scope.pageContent={};
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
    		
    		$location.url("/eLearning");
    		scope.$parent.execute('cancel')
    	}
    	scope.showGoalListModal=function(){
    		if ($rootScope.showeLearningLandingPage==true) {
    			$location.url("/eLearning");
    		}
    		else if ($rootScope.showMyGoalLandingPage){
    			$rootScope.$broadcast("showGoalListModal");
    		}
    		else if ($("#isPal").html()!="true"){
    			$rootScope.$broadcast("showGoalListModal");
    		}
    		else{
    			$location.url("/eLearning");
    		}
        	
        	scope.$parent.execute('cancel')
        }
        scope.$on("Input",function(event,id,value){
        	if (value){
        		scope.answers[id]=value
        	}
        	
        	});
        scope.executeAssessment=function(command){
        	if(command.id=="000"){
        		$http.get(userStatusUrl).then(function(res){

                    checkLogin(res,"")
            		var isAssessed=res.data.data[0].isAssessed;
            		$("#isAssessed").html((isAssessed).toString());
            		$("#incompleteQuizes").html(res.data.data[0].incompleteQuizes.join());
            		$("#completeQuizes").html((res.data.data[0].incompleteQuizes.length==0).toString());
            		 
            		
            	})
        		scope.$parent.execute('cancel');return
        		}
        	var Flag=null
			for (var i in scope.pageContent['Step'+scope.currentPage]){
				if ((('id' in scope.pageContent['Step'+scope.currentPage][i]) && scope.pageContent['Step'+scope.currentPage][i].id && !(scope.pageContent['Step'+scope.currentPage][i].id in scope.answers) && (!scope.answers[scope.pageContent['Step'+scope.currentPage][i].id]) || (scope.answers[scope.pageContent['Step'+scope.currentPage][i].id]=="NULL")))
					{scope.tmp=scope.currentPage+0;
					 Flag="Alert";
					 
					}
				
			}
			if(Flag){
				scope.tmp=scope.currentPage+0
				scope.currentPage=Flag;
				scope.tmpText=scope.pageContent.text1;
				scope.tmpsubTitle=scope.pageContent.subTitle+"";
				scope.pageContent.subTitle=null;
				return
			}
			if($("#isAssessed").html()!="true"){
				$http({url:url,
	    			data:{"id":"137","applicationId":"Assessment","uniqueIdentifier": "pageSubmit"},
	        		method:"POST"
	        	}).then(function (res) {
	        		checkLogin(res,"")
	        	});
			}
        	
        	if (command.id=="111"){
        		var formResult={"submitCommand":{"id":"710","uniqueIdentifier":"assessment","applicationId":"Assessment"},"formData":{"formFields":[],"formId":"","destinationBean":""}};
                for (var item in scope.answers) {
                	formResult['formData']['formFields'].push({"fieldName": item, "fieldData": scope.answers[item], "dataType": "String"});
                }
                $http({
                	url:submitFormUrl,
                	method:"POST",
                	data:formResult
                })
                    .then(function(res){
                    	checkLogin(res,"");
                        scope.content=res.data.data[0];
                    	if (!scope.content.commands || !scope.content.commands.length){
                    		scope.content.commands=[{"title":"Click to Continue","id":"000"}]
                    		
                    		}
                    	var isAssessed=res.data.data[0].isAssessed;
                		$("#isAssessed").html("true");
                    	scope.showClose=true;
                        //scope.bodyData=$sce.trustAsHtml(scope.content.bodyConent);

    					// Update self assessment status                	
    					var data={
                  			  "selfAssessmentStatus":"Yes"
                		};
                		$http({url:nniReportUrl,
                    		data:data,
                    		method:"POST"
                    	}).then(function(result){
                    		//$rootScope.$broadcast("refreshPage");
                    		//scope.$parent.execute('cancel');
                    		
                    	});
                		if ($("#isPal").html()=="true" || $rootScope.showeLearningLandingPage==true ){
                			scope.currentPage+=1;
                		}
                		else{
                			scope.currentPage="End";
                		}
                		return
                			
                    });
        	}
        	else if(command.id=="222"){
        		var formResult={"submitCommand":{"id":"710","uniqueIdentifier":"assessment"},"formData":{"formFields":[],"formId":"","destinationBean":""}};
        		var errorFlag=false;
        		var item
                for (var i=0; i<scope.pageContent.formSections[0].items.length;i++) {
                	item=scope.pageContent.formSections[0].items[i].id;
                	console.log(scope.pageContent.formSections[0].items[i])
                	if (item==null){continue}
                	if (item in scope.answers && scope.answers[item]){
                		
                		formResult['formData']['formFields'].push({"fieldName": item, "fieldData": scope.answers[item], "dataType": "String"});
                		scope.pageContent.formSections[0].items[i].errorMessage=null;
                	}
                	else{
                		scope.pageContent.formSections[0].items[i].errorMessage="The answer is mandatory";
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
                	
                	scope.currentPage+=1;
                })
        		
        		
        	
        		
        		
        	}
        	
        }
        
        scope.fetchPage=function(step){
        	if(step=="prev"){scope.currentPage-=1;
        	$http.get('_data/components/questionnaire/assessment.json',{timeout: 30000, cache: false})
            .then(function(res){
            	scope.pageContent.title=res.data['Step'+scope.currentPage].title;
            	scope.pageContent.subTitle=res.data['Step'+scope.currentPage].subTitle;
            	scope.pageContent.text1=res.data['Step'+scope.currentPage].text1;})
        	return	
        	}
        	else if (step=="stop"){
        		scope.tmp=scope.currentPage;
        		scope.currentPage='Alert';
        		return
        		
        	}
        	else if (step=="exit"){
        	
        		
        		scope.$parent.execute('cancel')
        		return
        		
        	}
        	else if (step=="stay")
        		{
        		scope.currentPage=scope.tmp;
        		scope.text1=scope.temText;
        		scope.subTitle=scope.temsubTitle;
        		$http.get('_data/components/questionnaire/assessment.json',{timeout: 30000, cache: false})
                .then(function(res){
                	scope.pageContent.title=res.data['Step'+scope.currentPage].title;
                	scope.pageContent.subTitle=res.data['Step'+scope.currentPage].subTitle;
                	scope.pageContent.text1=res.data['Step'+scope.currentPage].text1;})
        		return
        		}
        	else if (step=="next")
        		{
        		$http.get('_data/components/questionnaire/assessment.json',{timeout: 30000, cache: false})
                .then(function(res){
                	scope.pageContent.title=res.data['Step'+scope.currentPage].title;
                	scope.pageContent.subTitle=res.data['Step'+scope.currentPage].subTitle;
                	scope.pageContent.text1=res.data['Step'+scope.currentPage].text1;})
        		}
	        	
//	        	$http({url:url,
	  //      		data:{"id":"137","applicationId":"Assessment","page":scope.currentPage.toString()},
	//        		method:"POST"
	    //    	}).then(function (res) {
	       // 		checkLogin(res,"")
	      //});
        	
        	if(scope.currentPage<3)
        		{
        		var Flag=null
    			for (var i in scope.pageContent['Step'+scope.currentPage]){
    				if ((('id' in scope.pageContent['Step'+scope.currentPage][i]) && scope.pageContent['Step'+scope.currentPage][i].id && !(scope.pageContent['Step'+scope.currentPage][i].id in scope.answers) && (!scope.answers[scope.pageContent['Step'+scope.currentPage][i].id]) || (scope.answers[scope.pageContent['Step'+scope.currentPage][i].id]=="NULL")))
    					{scope.tmp=scope.currentPage+0;
    					 Flag="Alert";
    					 
    					}
    				
    			}
    			if(Flag){
    				scope.tmp=scope.currentPage+0
    				scope.currentPage=Flag;
    				scope.tmpText=scope.pageContent.text1;
    				scope.tmpsubTitle=scope.pageContent.subTitle+"";
    				scope.pageContent.subTitle=null;
    			}
    			else
    				{
            		if($("#isAssessed").html()!="true"){
		
		    				$http({url:url,
		    	    			data:{"id":"137","applicationId":"Assessment","uniqueIdentifier": "page" + scope.currentPage.toString()},
		    	        		method:"POST"
		    	        	}).then(function (res) {
		    	        		checkLogin(res,"")
		    	        	});
            		}
    				scope.currentPage+=1;
    				
    				}
    			
        		}
        	else{
        		if($("#isAssessed").html()!="true"){

	        		$http({url:url,
		    			data:{"id":"137","applicationId":"Assessment","uniqueIdentifier": "page" + scope.currentPage.toString()},
		        		method:"POST"
		        	}).then(function (res) {
		        		checkLogin(res,"")
		        	});
        		}
	        		scope.currentPage+=1;
        	}
        	return
        	switch(scope.currentPage){
        		case 1:
        			var Flag=null
        			for (var i in scope.pageContent['Step'+scope.currentPage]){
        				if (!(scope.pageContent['Step'+scope.currentPage][i].id in scope.answers && scope.answers[i]))
        					{scope.tmp=scope.currentPage+0;
        					 Flag="Alert";
        					 break;
        					}
        				
        			}
        			if(Flag){scope.currentPage=Flag;
        			break;
        			}
        			scope.currentPage+=1;
        			break;
        		case 2:
        			scope.currentPage+=1;
        			break;
        		case 3:
        			
        			if($("#isPal").html()=="true"){
        				scope.currentPage="End";
                	}
                	else{
                		scope.currentPage+=1;
                		break;
                		$http.get(userStatusUrl).then(function(res){

                	        checkLogin(res,"")
                	        var incompleteQuizes=res.data.data[0].incompleteQuizes;
                	        if (incompleteQuizes.length!=0){
                    			var quizId=incompleteQuiz.pop();
                    			$("#incompleteQuizes").html(incompleteQuiz.join())
                    			var ModalInstanceCtrl = function ($scope,$modalInstance) {
                                    $scope.execute=function(command,answer){
                                        if (command==='cancel'){
                                        	$http.get(userStatusUrl).then(function(res){

                                                checkLogin(res,"")
                                        		var isAssessed=res.data.data[0].isAssessed;
                                        		$("#isAssessed").html((isAssessed).toString());
                                        		$("#incompleteQuizes").html(res.data.data[0].incompleteQuizes.join());
                                        		$("#completeQuizes").html((res.data.data[0].incompleteQuizes.length==0).toString());
                                        		 
                                        		
                                        	})
                                            $modalInstance.dismiss('cancel');
                                        }

    	                            };
    	                   		}
    	                   		var modalInstance;
    	                        var template='<div  generic-Questionnaire-Dir page="'+"{'id':'goalQuestionnaire','uniqueIdentifier':'"+quizId+"'}"+'" ></div>'
                                modalInstance = $modal.open({
                                        windowClass: varWindowClass,
                                        template: template,
                                        controller: ModalInstanceCtrl,
                                        backdrop : 'static'
                                    });
                    			
                    		}
                    		scope.currentPage+=1;
                			
                		})
                		
                        
                	}
        			
        			break;
        		case 6:
        			scope.$parent.execute('cancel');
    				
        	}
        	return
        	scope.currentPage=i;
        	
        
        };
        if($("#isAssessed").html()!="true"){
			$http({url:url,
    			data:{"id":"137","applicationId":"Assessment","uniqueIdentifier": "pageStart"},
        		method:"POST"
        	}).then(function (res) {
        		checkLogin(res,"")
        	});
		}
        scope.$watch('currentPage', function(){
        	if (scope.currentPage==0 && scope.currentPage!="Alert"){
        		scope.pageContent={}
        		if($("#isPal").html()=="true"){
        			scope.pageContent.text1="<p>Congratulations!  By starting the Diabetes Health Coach program you are taking an important step in your diabetes management. Please read the disclosure below before continuing to the next step.</p><br><p><strong>Disclosure about use of program data.</strong>As part of the Diabetes Health Coach Program (\"the Program\"), you will answer questions about your diabetes management and about how useful you find the content in the Program. Novo Nordisk may use this information in a deidentified manner for marketing and research purposes and may share the information with third parties. Your name and other potentially identifiable personal information will be removed and will not be shared with third parties.</p><br><p>When you register for the Program, Novo Nordisk will be able to match your profile with the health care provider (HCP) who prescribed your medication. Novo Nordisk may share the information you provide through the program with your HCP in a deidentified manner to help your HCP understand the impact of the Program.</p><br><p>By clicking Continue, you AGREE that Novo Nordisk can use your information in this manner.</p>"
        		}
        		else{
        			scope.pageContent.text1="<p>Congratulations!  By starting the Diabetes Health Coach program you are taking an important step in your diabetes management. Please read the disclosure below before continuing to the next step.</p><br><p><strong>Disclosure about use of program data. </strong>As part of the Diabetes Health Coach Program (\"the Program\"), you will answer questions about your diabetes management and about how useful you find the content in the Program. Novo Nordisk may use this information in a deidentified manner for marketing and research purposes and may share the information with third parties. Your name and other potentially identifiable personal information will be removed and will not be shared with third parties.</p><br><p>By clicking Continue, you AGREE that Novo Nordisk can use your information in this manner.</p>"
        		}
        		return
        	}
        	if (( scope.currentPage<4 && !("Step"+scope.currentPage in scope.pageContent)) || scope.currentPage=="Alert" || scope.currentPage=="End"){
			        	 $http.get('_data/components/questionnaire/assessment.json',{timeout: 30000, cache: false})
			            .then(function(res){
			            	var questionList=res.data['Step'+scope.currentPage].items;
			            	scope.pageContent.title=res.data['Step'+scope.currentPage].title;
			            	scope.pageContent.subTitle=res.data['Step'+scope.currentPage].subTitle;
			            	
			            	scope.pageContent.text1=res.data['Step'+scope.currentPage].text1;
			            	if (scope.currentPage<4){
				            		var formResult={"formFields":[]};
				                    for (var item in questionList) {
				                    	
				                    	if (questionList[item].id){
				                    		formResult["formFields"].push({"fieldName": questionList[item].id, "fieldData": "", "dataType": "String"});
				                    	}
				                    	
				                    }
				                    $http({
					                	url:getQuestionAnswerUrl,
					                	method:"POST",
					                	data:formResult
					                }).then(function(res){
					                	checkLogin(res,$rootScope);
					                	if (res.data.formFields){
					                		for (var i in res.data.formFields){
					                			for (var j in questionList){
					                				if(questionList[j].id==res.data.formFields[i].fieldName){
					                					scope.answers[res.data.formFields[i].fieldName]=res.data.formFields[i].fieldData;
			                                            for(var z in questionList[j].options) {
					                						if (questionList[j].options[z].value==res.data.formFields[i].fieldData && questionList[j].options[z]) {
					                							questionList[j].value=questionList[j].options[z];
					                							break
					                						}
					                					}
					                				}
					                			}
					                		}
					                		
					                		
					                	}
					                	scope.pageContent['Step'+scope.currentPage]=questionList;
					                })
			                }
			            	
			                
			                //if (scope.currentPage==4){scope.pageContent.text1=scope.pageContent.text11+scope.answers.telephone+scope.pageContent.text12}
			                                
			            });
        	}
        	else if (scope.currentPage>3){
        		$("#isAssessed").html("true");
        		
        		$http.get(userStatusUrl).then(function(res){

        	        checkLogin(res,"")
        	        
        	        var incompleteQuizes=res.data.data[0].incompleteQuizes;
        	        
        	        if(incompleteQuizes.length>0){
            			
            			scope.uniqueIdentifier=incompleteQuizes.pop();
            			$("#incompleteQuizes").html(incompleteQuizes.join());
            			$http.get("_data/components/questionnaire/goalAssesment.json",{timeout: 30000, cache: false})
                		.then(function(res){
                			scope.pageContent={};
                			scope.pageContent=res.data[scope.uniqueIdentifier];
                			scope.pageContent.text1=scope.pageContent.formSections[0].desc;
                			
                			
                		})
            			
            		}
            		else{
            			scope.currentPage="End";
            		}
        	        
        	        
        	        
        	       
        			
        		})
        		
        		
        	}
        });

    }
    return {
        restrict: 'A',
        //scope:{page: '=page'},
        templateUrl:'components/questionnaire/assessment/assessment-tpl.html',
        link:linker
    };
});

