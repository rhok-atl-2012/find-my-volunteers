angular.module('tabs', []).
  directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      controller: function($scope, $element) {
        var panes = $scope.panes = [];
        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
          if (pane.map) {
            $scope.showClickableMap = true;
          }
        }

        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      },
      template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  }).
  directive('pane', function($rootScope) {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@', map: '=map' },
      link: function(scope, element, attrs, tabsCtrl) {
        $rootScope.newSite = {};
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  })
