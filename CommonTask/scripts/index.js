(function () {
    $(window).on('DOMContentLoaded load resize scroll', function () {
        var $elements = $(':inView');
        
        console.log('\nin viewport: ' + $elements.length);
        $elements.each(function() {
            console.log(this.tagName);
        });
    });
})();