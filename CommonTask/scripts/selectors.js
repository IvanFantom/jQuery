(function () {
    $.extend($.expr[':'], {
        inView: function (element) {
            //if (element instanceof jQuery) {
            //    element = element[0];
            //}

            //var rect = element.getBoundingClientRect();

            //return (
            //    rect.top >= 0 &&
            //    rect.left >= 0 &&
            //    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&     /*or $(window).height() */
            //    rect.right <= (window.innerWidth || document.documentElement.clientWidth)           /*or $(window).width() */
            //);

            var $window = $(window);

            var viewport = {
                top: $window.scrollTop(),
                left: $window.scrollLeft()
            };
            viewport.right = viewport.left + $window.width();
            viewport.bottom = viewport.top + $window.height();
            
            var $element = $(element);
            var bounds = $element.offset();
            bounds.right = bounds.left + $element.outerWidth();
            bounds.bottom = bounds.top + $element.outerHeight();

            return (viewport.right > bounds.left &&
                viewport.left < bounds.right &&
                viewport.bottom > bounds.top &&
                viewport.top < bounds.bottom);
        }
    });
})();