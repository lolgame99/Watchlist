$(function() {
    var user = $.url("?u");
    if (typeof user != "undefined") {
        $("a").each(function(index, el) {
            $(this).attr("href", $(this).attr("href") + "?u=" + user);
        });
        $("a[href ^= 'login.html']").html("Konto");
        $("a[href ^= 'login.html']").attr("href", 'account.html');
    }

    $("body").on('click', '.seriesLink', function(event) {
        var id = $(this).data('id');

        if (typeof user == "undefined") {
            window.location.href = "viewSeries.html?id=" + id + "";
        } else {
            window.location.href = "viewSeries.html?id=" + id + "&u=" + user + "";
        }
    });


});
