$(document).ready(function () {
    var a = {};
    $.getJSON('../../data/data.json', function (data) {
        a = data;
        $.each(a.buildings, function (idx) {
            $('table tbody').append(
                '<tr><td>' + a.buildings[idx].id
              + '</td><td>' + a.buildings[idx].strataplannumber
              + '</td><td>' + a.buildings[idx].buildingdisplay
              + '</td><td>' + a.buildings[idx].postcode
              + '</td><td>' + a.buildings[idx].localgovernment
              + '</td><td>' + a.buildings[idx].numberoflots
              + '</td><td>' + a.buildings[idx].stratamanager
              + '</td></tr>');
        });

        $('table tbody tr').removeClass('table-tbody-tr-clicked');
        $('table tbody tr:first-child').addClass('table-tbody-tr-clicked');
        $('#hero-content').css('background-image', "url('../content/images/000001.jpg')");

        $('table tbody tr').on('click', function () {
            var tablerow = $(this);
            var id = tablerow.find('td:first-child').text();
            var strataplannumber = tablerow.find('td:nth-child(2)').text();
            var buildingdisplay = tablerow.find('td:nth-child(3)').text();
            var postcode = tablerow.find('td:nth-child(4)').text();
            var localgovernment = tablerow.find('td:nth-child(5)').text();
            var numberoflots = tablerow.find('td:nth-child(6)').text();
            var stratamanager = tablerow.find('td:last-child').text();
            $('#hero-content').css('background-image', "url('../content/images/" + id + ".jpg')");
            $('table tbody tr').removeClass('table-tbody-tr-clicked');
            tablerow.addClass('table-tbody-tr-clicked');
        });
    });
});
