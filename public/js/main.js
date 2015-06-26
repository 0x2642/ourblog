(function($, window, document, undefined) {
    'use strict';

    var $window = $(window),
        $document = $(document);

    //button href helper
    $("button[href]").on("click",function(event) {
        $.hash(window.location.href=$(this).attr("href"));
    });

    $("p.editable").on("blur",function(event){
        if (/^(https?:\/\/)?([\d\w\.\/-]+)\/([\d\w\.\/%_-]+)\.(jpg|jpeg|png)$/
            .test($(this).text())) {
            $(".banner-img").attr("src",$(this).text());
        };
    })

})(jQuery, window, document);
