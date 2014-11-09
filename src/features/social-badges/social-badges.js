angular.module('socialBadges',
  []
).directive('socialBadges', function () {
  'use strict';

  return {
    restrict: 'EA',
    //templateUrl: '/features/social-badges/social-badges-template.html',
    template: '<div id="fb-container" class="badge">' +
        '<div id="fb-root"></div>' +
          '<div class="fb-follow" data-href="http://www.facebook.com/pages/1000-BC/271010322910307" data-width="75"' +
          'data-height="75" data-colorscheme="light" data-layout="box_count" data-show-faces="true"></div>' +
        '</div>' +

      '<!--<div id="twitter-container" class="badge">-->' +
      '<!--<a href="http://twitter.com/share" class="twitter-share-button" data-count="vertical">Tweet</a>-->' +
      '<!--<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>-->' +
      '<!--</div>-->' +

      '<div id="gplus-container" class="badge gplus">' +

      '<div class="g-plusone" data-size="tall" data-href="http://1000-bc.com"></div>' +
    '</div>',

    link: function () {

    }
  };

});
