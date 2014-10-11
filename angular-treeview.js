(function(ng) {
  ng
  .module('angular-treeview', [])
  .directive('tree', ['$compile', function($compile){
    var selected = null;
    return {
      restrict: 'E',
      scope: {branches:'='},
      templateUrl: 'angular-treeview.html',
      compile: function($el) {
        var innards = $el.contents().remove(),
            mashedInnards;
        return function(scope, $el, $attr) {
          if(!mashedInnards) mashedInnards = $compile(innards);
          mashedInnards(scope, function(clone, scope) {
            $el.append(clone);
          });
        };
      },
      controller: ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.isFile = function(branch) { return !branch.children; };
        $scope.isOpenFolder = function(branch) { return branch.children && branch.expand; };
        $scope.isClosedFolder = function(branch) { return branch.children && !branch.expand; };
        $scope.select = function(branch) {
          selected = branch;
          if (branch.act) branch.act();
          $rootScope.$broadcast('treeItemSelected', branch);
        }
        $scope.isSelected = function(branch) { return branch === selected; };
        $scope.toggleAndAct = function() {
          $scope.branch.expand = !$scope.branch.expand;
          if (branch.act) branch.act();
        }
      }]
    };
  }]);
})(angular);
