'use strict';
angular.module('formDir', []).
directive('formDir', function($http,$sce,$modal,$rootScope) {
    function linker(scope){
    	scope.execute=function(action){
    		if(action=="cancel"){scope.$parent.$parent.execute(action);}
    		else if(action=="submit"){
    			console.log(scope.content.questionItems)
				    			var tmp={'formFields':[]};
								for (var i=0; i<scope.content.questionItems.length; i++){
									
									if(scope.content.questionItems[i].id in scope.answer ){
										tmp['formFields'].push({"fieldName":scope.content.questionItems[i].id,"fieldData":scope.answer[scope.content.questionItems[i].id],"dataType":"String"});
										scope.content.questionItems[i].errorMessage=null;
										
									}
								///	else{
										//scope.content.questionItems[i].errorMessage="Please enter a proper value";
										//return
								//	}
								}
console.log(tmp)
				                $http({
				                    method:"POST",
				                    url:scope.sendBackUrl,
				                    data:tmp,
				                    headers: {'Content-Type': 'application/json','Accept':'application/json'}
				                }).then(function(res){
				                	checkLogin(res,$rootScope);
				                	var Flag=0;
				                	var FlagGeneral=0;
				                	for (var i=0; i<res.data.errors.length; i++){
				                		for (var j=0; j< scope.content.questionItems.length; j++){
				                			if(!res.data.errors[i].id){
				                				scope.content.errorMessage=res.data.errors[i].msg;
				                				FlagGeneral=1
				                				
				                			}
				                			if (scope.content.questionItems[j].id==res.data.errors[i].id){
				                				scope.content.questionItems[j].errorMessage=res.data.errors[i].msg;
				                				Flag=1;
				                			}
				                		
				                		}
				                	}
				                	if (Flag==0){
			                			for (var j in scope.content.questionItems){
			                				scope.content.questionItems[j].errorMessage=null;
			                			}
			                		}
			                		if (FlagGeneral==0){
			                			scope.content.errorMessage=null;
			                		}
			                			
				                	var ModalInstanceCtrl = function ($scope,$modalInstance) {
						        			
						        			$scope.execute=function(action){
						        				$modalInstance.dismiss('cancel');
						        				
						        			}
						        	}
			                		if(res.data.msg){
			                        		var tmp='<div dialog-Dir questionbuttons="0" questiontitle="" questionmsg="'+"'"+res.data.msg+"'"+'"  ></div>';
							                var modalInstance = $modal.open({
							
							                    template: tmp,
							                    controller: ModalInstanceCtrl,
							                    backdrop : 'static'
							                    
							                });
							                $http.get(sendBackUrl)
						                    .then(function (res) {
						                    	
						                        scope.content = res.data;
						                        scope.sendBackUrl=sendBackUrl;
						                        scope.isInline=true;
						                        if ('bodyContent' in scope.content) {
						                            scope.bodyContent = $sce.trustAsHtml(scope.content.bodyContent);
						                            
						                        }
						                        for (var i in scope.content.questionItems){
													if(scope.content.questionItems[i].value){
														scope.answer[scope.content.questionItems[i].id]=scope.content.questionItems[i].value;
														scope.content.questionItems[i].errorMessage=null;
														
													}
													
												}
						                    });
			                			
				                		
				                	}
				                })
								
							
    			
                
    			//scope.bodyContent = $sce.trustAsHtml("<p>An invite has been sent to the email address you provided.</p>");
    			//scope.content.questionItems=[];
    			//scope.content.bottomCommands=[{'action':'cancel','text':'Ok'}];
    			
    		}
    		else
    		{
                alert("this action is supposed to be executed in form-Dir:"+action);
            }
    	};
        scope.$on('Input',function(event,id,inp){scope.answer[id]=inp;});
        
            if (scope.page) {
            	//$http.get('_data/components/formDir/data.json')
            	var sendBackUrl=address+appName+scope.page;
                $http.get(sendBackUrl)
                    .then(function (res) {
                    	
                        scope.content = res.data;
                        scope.sendBackUrl=sendBackUrl;
                        scope.isInline=true;
                        if ('bodyContent' in scope.content) {
                            scope.bodyContent = $sce.trustAsHtml(scope.content.bodyContent);
                            
                        }
                        for (var i in scope.content.questionItems){
							if(scope.content.questionItems[i].value){
								scope.answer[scope.content.questionItems[i].id]=scope.content.questionItems[i].value;
								scope.content.questionItems[i].errorMessage=null;
								
							}
							
						}
                    });

            };

      
    }


    return {
        restrict: 'A',
        scope:{page: '=page',idx:'=idx'},
        templateUrl:'components/formDir/form1-tpl.html',
        link:linker
    };
});

