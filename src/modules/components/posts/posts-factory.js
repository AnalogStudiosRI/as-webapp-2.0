'use strict';

(function (angular) {

  angular
    .module('as.components.posts')
    .factory('PostsFactory', postsFactory);

  postsFactory.$inject = ['$resource'];

  function postsFactory($resource) {

    return $resource('/api/posts/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }

}(angular));