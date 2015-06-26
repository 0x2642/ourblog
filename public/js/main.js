(function($, window, document, undefined) {
    'use strict';

    var $window = $(window),
        $document = $(document);

    $('#post').click(function(event) {
    	$.hash(window.location.href="/post");
    });
})(jQuery, window, document);
