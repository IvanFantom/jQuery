(function () {
    $(window).on('DOMContentLoaded load resize scroll', function () {
        var $elements = $(':inView');

        console.log($elements.length);
    });
})();