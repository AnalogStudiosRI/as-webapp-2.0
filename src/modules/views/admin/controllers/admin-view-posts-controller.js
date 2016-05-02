'use strict';

(function (angular) {

  angular
    .module('as.views.admin')
    .controller('AdminViewPostsController', adminViewPostsController);

  adminViewPostsController.$inject = ['$log', '$modal', 'PostsFactory', 'usSpinnerService'];

  function adminViewPostsController($log, $modal, PostsFactory, usSpinnerService) {
    $log.info('ENTER as.views.admin.posts');
    /*jshint validthis:true */
    var vm = this;
    var pristinePost = {};

    vm.posts = [];
    vm.post = {
      title: '',
      summary: ''
    };

    function getPosts() {

      PostsFactory.query(function(response) {
        usSpinnerService.stop('spinner-posts');
        vm.posts = response.reverse();
      }, function(response) {
        usSpinnerService.stop('spinner-posts');
        showModal('Error - ' + response.status, 'There was a problem getting posts.  Please try again.');
      });
    }

    function updatePost(postResource) {

      postResource.$update().then(function() {
        usSpinnerService.stop('spinner-posts');
        showModal('Success', 'Event: ' + vm.post.title + ' successfully updated.');
        vm.resetForm();
        getPosts();
      }, function (response) {
        usSpinnerService.stop('spinner-posts');
        showModal('Error - ' + response.status, 'There was a problem updating the post.  Please try again.');
        vm.resetForm();
      });
    }

    function savePost(eventResource) {

      eventResource.$save(function() {
        usSpinnerService.stop('spinner-posts');
        showModal('Success', 'Event: ' + vm.post.title + ' successfully made.');
        vm.resetForm();
        getPosts();
      }, function (response) {
        usSpinnerService.stop('spinner-posts');
        showModal('Error - ' + response.status, 'There was a problem creating the event.  Please try again.');
        vm.resetForm();
      });
    }

    function modelSavedPostForRequest(type) {
      var vmPost = vm.post;
      var post = new PostsFactory();

      if (type === 'update') {
        post.id = vm.post.id;
      }

      post.title = vmPost.title;
      post.summary = vmPost.summary;

      return post;
    }

    function showModal(heading, body) {
      modalInstanceController.$inject = ['$scope', '$modalInstance'];

      function modalInstanceController($scope, $modalInstance) {
        $scope.heading = heading;
        $scope.body = body;

        $scope.ok = function () {
          $modalInstance.close();
        };
      }

      $modal.open({
        animation: true,
        templateUrl: '/views/admin/templates/admin-view-modal.html',
        controller: modalInstanceController
      });
    }

    vm.resetForm = function() {
      vm.post = angular.copy(pristinePost);
    };

    vm.submitPost = function() {
      usSpinnerService.spin('spinner-posts');
      var isUpdate = vm.post.id;  //new events wont have an id
      var eventResource = isUpdate ? modelSavedPostForRequest('update') : modelSavedPostForRequest();

      if (isUpdate) {
        updatePost(eventResource);
      } else {
        savePost(eventResource);
      }
    };

    vm.init = function() {
      usSpinnerService.spin('spinner-posts');
      pristinePost = angular.copy(vm.post);
      getPosts();
    };

    vm.init();
  }

}(angular));