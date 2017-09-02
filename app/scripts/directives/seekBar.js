(function() {
  function seekBar($document) {
    /*
     * @function calculatePercent
     * @desc calculate where a  user clicked and distance from seekbar

     */
    var calculatePercent = function(seekBar, event) {
      /*
       * @desc jQuery specific event in which we subtract the  X-distance from left of page to start of seekbar from the totalX distance of clicked happened
       * @type jQuery {object}
       */
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };
    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: {},
      link: function(scope, element, attributes) {
        scope.value = 0;
        scope.max = 100;
        /*
         * @desc holds the element that matches the directives, whether is volume seekbar or song seekbar to apply jQuery method on it
         * @type jQuery {object}
         */
        var seekBar = $(element);
        /*
         * @function percentString
         * @desc calculate a percent of seekbar based on it's max value

         */
        var percentString = function() {
          /*
           * @desc current song time or default value of 0
           * @type number
           */
          var value = scope.value;
          /*
           * @desc max song time or default value of 100
           * @type number
           */
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };
        /*
         * @function fillStyle
         * @desc return the width of the seekbar based on percentString function

         */
        scope.fillStyle = function() {
          return {
            width: percentString()
          };
        };
        /*
         * @function thumbStyle
         * @desc updates the position of thumb

         */
        scope.thumbStyle = function() {
          return {
            left: percentString()
          };
        };
        /*
         * @function onClickSeekBar
         * @desc update the seekbar vlaue based on where user clicked
         * @param {Object} event
         */
        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
        };
        /*
         * @function trackThumb
         * @desc same as onClickSeekBar function but it apply the change constatly while user is dragging the seek bar instead of clicking it

         */
        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            var percent = calculatePercent(seekBar, event);


            scope.$apply(function() {
              scope.value = percent * scope.max;
            });



          });

          $document.bind('mouseup.thumb', function() {
            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          });
        };
      }
    };
  }
  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);
})();
