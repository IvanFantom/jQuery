(function () {
    'use strict';

    $.extend($.expr[':'], {
        inView: function (element) {
            var $window = $(window);

            var viewport = {
                top: $window.scrollTop(),
                left: $window.scrollLeft()
            };
            viewport.right = viewport.left + $window.width();
            viewport.bottom = viewport.top + $window.height();
            
            var $element = $(element);
            var offset = $element.offset();
            offset.right = offset.left + $element.outerWidth();
            offset.bottom = offset.top + $element.outerHeight();

            return viewport.right >= offset.left &&
                viewport.left <= offset.right &&
                viewport.bottom >= offset.top &&
                viewport.top <= offset.bottom;
        }
    });
})();