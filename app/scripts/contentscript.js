/*global jQuery:false, key:false */
(function($) {
  'use strict';

  var recalculatePoints = function() {
    $('.zh-pipeline').each(function() {
      var sum = $(this)
        .find('.zh-issue-label')
        .map(function() {
          var labelName = $(this).data('name');
          if ($.isNumeric(labelName)) {
            return parseFloat(labelName);
          } else {
            return 0;
          }
        })
        .get()
        .reduce(function(a, b) {
          return a + b;
        }, 0);

      $(this)
        .find('.zh-pipeline-count')
        .text(sum)
        .addClass('zh-scrum-points-calculated');
    });
  };

  // Wait for save event by watching the class property of `.zh-board-pipelines`
  var installSaveObserver = function() {
    var target = $('.zh-board-pipelines')[0];
    var watchedAttributes = ['class'];
    var observer = new MutationObserver(recalculatePoints);
    observer.observe(target, { attributes: true, attributeFilter: watchedAttributes });
  };

  // Wait for `.zh-board` to be in the DOM
  $('body')
    .livequery('.zh-board', function() {
      installSaveObserver();
      recalculatePoints();
    });

  // Calculate the sum on issues page when `+` is pressed
  key('shift+s', function() {
    var sum = $('.js-zh-issue-wrapper .label')
      .map(function() {
        var labelText = $(this).text();
        if ($.isNumeric(labelText)) {
          return parseFloat(labelText);
        } else {
          return 0;
        }
      })
      .get()
      .reduce(function(a, b) {
        return a + b;
      }, 0);

    $('.protip')
      .html('<strong>Total Points:</strong> ' + sum);
  });
})(jQuery);
