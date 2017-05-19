$(function() {
    var user = $.url("?u");
    $("body").on('click', '.seriesLink', function(event) {
        var id = $(this).data('id');

        if (typeof user == "undefined") {
            window.location.href = "viewSeries.html?id=" + id + "";
        } else {
            window.location.href = "viewSeries.html?id=" + id + "&u=" + user + "";
        }
    });

    $.ajax({
        method: "GET",
        url: "https://api.themoviedb.org/3/tv/airing_today?api_key=02315c61f82284303a120d89ce93baa4&language=de&page=1",
        beforeSend: function() {
            $("#newSeries").html("<div class='loader'>Loading...</div>");
        },
        success: function(data) {
            var output = "<ul>";
            $.each(data.results, function(id, obj) {
                output += "<li data-id='" + obj.id + "' class='seriesLink'>" + obj.name + "</li>";
            });
            output += "</ul>";
            $("#newSeries").html(output);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

    var output = "";
    $.getJSON("resources/news.json", function(data) {
        $.each(data.entries, function(i, obj) {
            output += "<h4>" + obj.head + " , " + obj.date + "</h4>";
            output += obj.text;
            if (!i + 1 == data.entries.length) {
                output += "<div class='spacer'></div>"
            }
        });
        $("#sitenews").html(output);
    });


});
