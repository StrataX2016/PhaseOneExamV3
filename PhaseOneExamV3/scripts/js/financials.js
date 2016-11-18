$(document).ready(function () {

    var maincontent = $('#fin-content');

    // load the buildings view by default
    maincontent.load('views/financials/purchaseorder.html');

    // wire up event handler
    $('#fin-items > div').each(function () {
        $(this).click(function () {
            var view = $(this).attr('view');
            maincontent.load('views/' + view);
        });
    });

    $('#fin-items > div').each(function () {
        $(this).hover(function () {
            $(this).toggleClass('fin-items-background-color');
        });
    });

});
