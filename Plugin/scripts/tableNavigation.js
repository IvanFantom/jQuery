(function ($) {
    'use stricts';

    $.fn.tableNavigation = function (options) {
        var settings = $.extend({}, $.fn.tableNavigation.defaults, options);

        function _clickCellHandler(e) {
            $(e.data.context).select();
        }

        function _keydownHandler(e) {
            var data = e.data;
            var oldX = parseInt($(data.context).attr('data-x'), 10);
            var oldY = parseInt($(data.context).attr('data-y'), 10);
            var newX = oldX;
            var newY = oldY;

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
            newX = newX < 0 ? data.columnCount : newX;
            newX = newX > data.columnCount ? 0 : newX;
            newY = newY < 0 ? data.rowCount : newY;
            newY = newY > data.rowCount ? 0 : newY;

            data.$tbody.find('input[data-x=' + newX + '][data-y=' + newY + ']').click();
        }

        return this.each(function () {
            var $tbody, $inputs, columnCount, rowCount, rowIndex;

            $tbody = $(this).find('tbody');
            $inputs = $tbody
                .find('input:enabled')
                .not(':hidden');
            columnCount = $tbody
                .find('tr:first-child')
                .find('input:enabled')
                .not(':hidden')
                .length - 1;
            rowCount = $tbody
                .find('tr')
                .length - 1;
            rowIndex = 0;

            $inputs.off('keydown.tablenavigation click.tablenavigation');
            $inputs.each(function () {
                $(this).on('click.tablenavigation', { context: this }, _clickCellHandler);

                $(this).on('keydown.tablenavigation', {
                    columnCount: columnCount,
                    rowCount: rowCount,
                    $tbody: $tbody,
                    context: this
                }, _keydownHandler);
            });

            $tbody.find('tr').each(function () {
                var columnIndex = 0;

                $(this)
                    .find('input:enabled')
                    .not(':hidden')
                    .each(function () {
                        $(this).attr({
                            'data-x': columnIndex,
                            'data-y': rowIndex
                        });

                        columnIndex++;
                    });

                rowIndex++;
            });
        });
    };

    $.fn.tableNavigation.defaults = {};
})(jQuery);