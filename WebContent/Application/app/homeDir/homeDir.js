
angular.module('homeDir', []).
    directive('homeDir', function() {
        return {
            restrict: 'A',
            replace:true,
            templateUrl:'Application/app/homeDir/home-tpl.html'
          };
      });

angular.module('legalDir', []).
directive('legalDir', function() {
    return {
        restrict: 'A',
        replace:true,
        template:'<div class="legal"><div class="container"><div class="row"><div class="col-sm-12"><p>&copy; The Highland 2013. <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p></div></div></div></div>'
      };
  });

angular.module('contactUs', []).
directive('contactUs', function() {
    return {
        restrict: 'A',
        replace:true,
        template:'<div class="col-sm-4"><div class="headline"><h3>Contact us</h3></div><div class="content"><p>San Francisco, CA 94101<br />1987 Lincoln Street<br />Phone: +0 000 000 00 00<br />Fax: +0 000 000 00 00<br />Email: <a href="#">admin@mysite.com</a></p></div></div>'
      };
  });

angular.module('footerDir', []).
directive('footerDir', function() {
    return {
        restrict: 'A',
        replace:true,
        templateUrl:'Application/app/homeDir/footer-tpl.html'
      };
  });