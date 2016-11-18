$(document).ready(function () {

    var maincontent = $('#content');

    // load the buildings view by default
    maincontent.load('views/buildings.html');

    // wire up event handler
    $('#sidebar-items > ul > li').each(function () {
        $(this).click(function () {
            var view = $(this).attr('view');
            maincontent.load('views/' + view);
        });
    });

    // wire up event handler
    $('#header-sidebar-items > ul > li').each(function () {
        $(this).click(function () {
            var view = $(this).attr('view');
            maincontent.load('views/' + view);
        });
    });

    $('#sidebar-items > ul > li').each(function () {
        $(this).hover(function () {
            $(this).find('div:first-child').toggleClass('sidebar-items-background-color');
            $(this).find('div:first-child').find('a').toggleClass('font-color-black').toggleClass('font-color-gray');
            $(this).find('div:nth-child(2)').fadeToggle(100);
        });
    });

    $('#header-sidebar-header').on('click', function () {

        $('#header-sidebar-items').toggle();

    });

});
