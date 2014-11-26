'use strict';
angular.module('inputComponentDir', ['ui.bootstrap']).
    directive('inputComponentDir', function($http) {
        function linker(scope){
        	scope.initSelect=function(){
        		if(scope.item.value){
        			scope.$emit('Input',scope.item.id,scope.item.value.value)
        		}
        		else{
        			scope.$emit('Input',scope.item.id,scope.item.options[0].value)	
        		}
        		
        	}
        	scope.setTime=function(){
        		if(scope.item.value==undefined)
        		{
        			var d1=new Date();
        		}
        		else{
        			var d1= new Date (scope.item.value);
        			
        			
        		}
        		var currentDate = new Date();
        		var hour=d1.getHours();
        	    var min=d1.getMinutes();
        	    currentDate.setMinutes(min);
        	    currentDate.setHours(hour);
        	    scope.item.value=currentDate;
        	    scope.$emit('Input',scope.item.id,scope.item.value)
        	}
        	scope.checkSelect=function(options){for(var i in options){if(options[i].selected==true){scope.answer=options[i]}}}
        	
        	scope.initDate=function(item,dt){
        		
        		var d= new Date(dt)
        		if(item.value){
        			scope.dt=parseInt(item.value);
        		}
        		scope.$emit('Input',item.id,d.getTime())
        		}
        	scope.sendDate=function(item,dt){
        		
        		var d= new Date(dt)
        		scope.$emit('Input',item.id,d.getTime())
        		}	
        	 scope.today = function() {
        		    scope.dt = new Date();
        		  };
        		  scope.today();

        		  scope.clear = function () {
        		    scope.dt = null;
        		  };

        		  // Disable weekend selection
        		  scope.disabled = function(date, mode) {
        		    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        		  };

        		  scope.toggleMin = function() {
        		    scope.minDate = scope.minDate ? null : new Date();
        		  };
        		  scope.toggleMin();
        		  scope.open = function($event) {
        		    $event.preventDefault();
        		    $event.stopPropagation();

        		    scope.opened = true;
        		  };

        		  scope.dateOptions = {
        		    formatYear: 'yy',
        		    startingDay: 1
        		  };
        	
        		  scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        		  scope.format = scope.formats[0];
        	
        	
        	
          }
        return {
            restrict: 'A',
            //scope:{item:'=item',answer:"=answer"},
            templateUrl:'components/inputComponent/inputComponent-tpl.html',
            link:linker
          };
      });

