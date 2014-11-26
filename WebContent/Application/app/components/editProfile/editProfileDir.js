'use strict';
angular.module('editProfileDir', []).
    directive('editProfileDir', function($http,$rootScope) {
        function linker(scope){
        		scope.answers={}
	        	scope.$on("Input",function(event,id,value){
	            	scope.answers[id]=value
	            	});
        		scope.execute=function(command){
        			if(command.title=="Cancel" || command.title=="Cancelar"){
        				
        				scope.$parent.$parent.execute('cancel')
        			}
        			else if (command.title=="Save" || command.title=="Guardar"){
        				for (var i=0; i< scope.content.formSections.length; i++){
        					for (var j=0; j< scope.content.formSections[i].items.length; j++){
        						if(!(scope.content.formSections[i].items[j].name in scope.answers)){
        							scope.answers[scope.content.formSections[i].items[j].name]=scope.content.formSections[i].items[j].value;
        						}
        						
        					}
        				}
        				var formResult={"formFields":[],"formId":"","destinationBean":""};
        				for (var item in scope.answers) {
        	            	formResult['formFields'].push({"fieldName": item, "fieldData": scope.answers[item], "dataType": "String"});
        	            }
        				$http({
        	            	url:editProfileUrl,
        	            	method:"POST",
        	            	data:formResult
        	            })
        	                .then(function(res){
        	                	checkLogin(res,$rootScope);
        	                	if(res.data.errors.length>0){
        	                		for(var ii in res.data.errors){
        	                			for (var i=0; i< scope.content.formSections.length; i++){
        	            					for (var j=0; j< scope.content.formSections[i].items.length; j++){
        	            						if ("id" in scope.content.formSections[i].items[j] && scope.content.formSections[i].items[j].id==res.data.errors[ii].id){
        	            							scope.content.formSections[i].items[j].errorMessage=res.data.errors[ii].msg;
        	            							
        	            						}
        	            						
        	            					}
        	            				}
        	                		}
        	                	}
        	                	else{
        	                		scope.finalMessage=res.data.msg;
        	                		scope.content=null;
        	                		
        	                	}
        	                	
        	                	})
        			}
        			
        		}
                $http.get(editProfileUrl)
                    .then(function(res){
                        scope.content=res.data;
                      });

          }

        return {
            restrict: 'A',
            scope:{page: '=page',idx:'=idx'},
            templateUrl:'components/editProfile/editProfile-tpl.html',


            link:linker
          };
      });

