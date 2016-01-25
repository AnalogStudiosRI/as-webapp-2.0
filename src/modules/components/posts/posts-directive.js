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

  PostsDirectiveController.$inject = ['$log', 'PostsFactory'];

  function PostsDirectiveController($log, PostsFactory) {
    var vm = this;
    vm.posts = [];

    PostsFactory.query(function(response) {
      vm.posts = response;
    }, function (response) {
      $log.error(response);
    });
  }

})(angular);