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
        url: "https://api.themoviedb.org/3/tv/popular?api_key=02315c61f82284303a120d89ce93baa4&language=de",
        beforeSend: function() {
            $(".wrapper").html("<div class='loader'>Loading...</div>");
        },
        success: function(data) {
            var output = "";
            var left = true;
            var test = 0;
            $.each(data.results, function(id, obj) {
                test += 1;
                var synopsis = $.trim(obj.overview).substring(0, 500).split(".").slice(0, -1).join(" ") + "...";
                if (synopsis == "...") {
                    synopsis = "<i>Keine Synopsis vorhanden, tut uns leid!</i>";
                }
                if (left) {

                    output += "<div class='singlePopSeries' id='leftPop'><img class='poster seriesLink' data-id='" + obj.id + "' src=http://image.tmdb.org/t/p/w342" + obj.poster_path + " alt='poster'>";
                    output += "<p class='seriesFont seriesLink' data-id='" + obj.id + "'>" + obj.name + "</p>";
                    output += "<p id='synops'>" + synopsis + "</p></div>";
                    left = false;
                } else if (!left) {
                    output += "<div class='singlePopSeries' id='rightPop'><img class='poster seriesLink' data-id='" + obj.id + "' src=http://image.tmdb.org/t/p/w342" + obj.poster_path + " alt='poster'>";
                    output += "<p class='seriesFont seriesLink' data-id='" + obj.id + "'>" + obj.name + "</p>";
                    output += "<p id='synops'>" + synopsis + "</p></div>";
                    left = true;
                }

            });
            $(".wrapper").html(output);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
});
