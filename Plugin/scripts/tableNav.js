(function ($) {
    $.fn.tableNav = function (options) {
        var settings = $.extend({}, $.fn.tableNav.defaults, options);

        return this.each(function () {
            var $tbody, $inputs, maxX, maxY, y;

            $tbody = $(this).find('tbody');
            $inputs = $tbody
                .find('input:enabled')
                .not(':hidden');
            maxX = $tbody
                .find('tr:first-child')
                .find('input:enabled')
                .not(':hidden')
                .length - 1;
            maxY = $tbody
                .find('tr')
                .length - 1;
            y = 0;

            $inputs.off('keydown.tablenav click.tablenav');
            $inputs.each(function () {
                $(this).on('click.tablenav', function () {
                    $(this).select();
                });

                $(this).on('keydown.tablenav', function (e) {
                    var newX, newY, oldX, oldY;
                    oldX = +$(this).attr('data-x');
                    oldY = +$(this).attr('data-y');
                    newX = oldX;
                    newY = oldY;

                    switch (e.which) {
                        case 37:
                            newX = oldX - 1;
                            break;
                        case 38:
                            newY = oldY - 1;
                            break;
                        case 39:
                            newX = oldX + 1;
                            break;
                        case 40:
                            newY = oldY + 1;
                            break;
                        default:
                            return;
                    }

                    e.preventDefault();
                    newX = newX < 0 ? maxX : newX;
                    newX = newX > maxX ? 0 : newX;
                    newY = newY < 0 ? maxY : newY;
                    newY = newY > maxY ? 0 : newY;

                    $tbody.find('input[data-x=' + newX + '][data-y=' + newY + ']').click();
                });
            });

            $tbody.find('tr').each(function () {
                var x = 0;

                $(this)
                    .find('input:enabled')
                    .not(':hidden')
                    .each(function () {
                        $(this).attr({
                            'data-x': x,
                            'data-y': y
                        });

                        x++;
                    });

                y++;
            });
        });
    };

    $.fn.tableNav.defaults = {};
})(jQuery);