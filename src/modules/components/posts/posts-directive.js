'use strict';

(function (angular) {

  angular
    .module('as.components.posts')
    .directive('asPosts', asPosts);

  function asPosts() {
    return {
      restrict: 'E',
      controller: PostsDirectiveController,
      controllerAs: 'vm',
      templateUrl: '/components/posts/posts-template.html'
    };
  }

  PostsDirectiveController.$inject = ['$log', '$sce', 'PostsFactory'];

  function PostsDirectiveController($log, $sce, PostsFactory) {
    var vm = this;
    vm.posts = [];

    vm.getTrustedHtml = function(html) {
      return $sce.trustAsHtml(html);
    };

    PostsFactory.query(function(response) {
      vm.posts = response.reverse();
    }, function (response) {
      $log.error(response);
    });
  }

})(angular);