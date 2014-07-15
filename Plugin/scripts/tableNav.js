(function ($) {
    $.fn.tableNav = function (options) {
        var settings = $.extend({}, $.fn.tableNav.defaults, options);

        return this.each(function () {
            console.log(this);
        });
    };

    $.fn.tableNav.defaults = {};
}(jQuery));