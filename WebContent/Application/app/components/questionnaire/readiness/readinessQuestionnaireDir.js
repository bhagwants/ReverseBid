'use strict';
angular.module('readinessQuestionnaireDir', []).
directive('readinessQuestionnaireDir', function($http,$sce) {
    function linker(scope){
        scope.execute=function(action){
            switch (action){
                case 'submitReadinessQuestionnaire':
                    scope.page="setReminderConfirmation";
                    scope.step=2;
                    break;
                case 'setReminder':
                    scope.page="setReminderConfirmation";
                    scope.step=3;
                    break
                case 'submitReminder':
                    scope.page="submitReminder";
                    scope.step=4;
                    break;
                default:
                    scope.$parent.$parent.execute(action)
            }
        }

        $http.get('_data/components/questionnaire/readinessQuestionnaire.json')
        .then(function(res){
            console.log('_data/components/questionnaire/readinessQuestionnaire.json'); // stephen newport debug
            scope.content=res.data;
        });
        scope.step=1

    }
    return {
        restrict: 'A',
        scope:{page: '=page',idx:'=idx'},
        templateUrl:'components/questionnaire/readiness/readinessQuestionnaire-tpl.html',


        link:linker
    };
});

