$(function() {
    var data = {};

    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }


    $.ajax({
        method: "GET",
        url: "https://api.themoviedb.org/3/tv/" + data.id + "?api_key=02315c61f82284303a120d89ce93baa4&language=de",
        beforeSend: function() {
            $(".plotparagraph").html("<div class='loader'>Loading...</div>");
        },
        success: function(data) {
            $(".listHeader").html("<h3 style='max-height:500;'>" + data.name + "</h3>");
            $(".image").html("<img class='poster' src='http://image.tmdb.org/t/p/w342" + data.poster_path + "' alt='poster' />");
            var plotOut = data.overview;
            if (!plotOut) {
                plotOut = "<i>Keine Synopsis vorhanden, tut uns leid!</i>";
            }
            $(".plotparagraph").html(plotOut);
            $(".name").html(data.name);
            $(".firstAiring").html(data.first_air_date);
            $(".seasons").html(data.number_of_seasons);
            $(".episodes").html(data.number_of_episodes);
            var productionOut = "";
            $.each(data.production_companies, function(index, el) {
                if (index + 1 < data.production_companies.length) {
                    productionOut += el.name + "<br>";
                } else {
                    productionOut += el.name;
                }
            });
            if (!productionOut) {
                productionOut = "<i>Keine Daten</i>";
            }
            $(".production").html(productionOut);
            var genreOut = "";
            $.each(data.genres, function(index, el) {
                if (index + 1 < data.genres.length) {
                    genreOut += el.name + "<br>";
                } else {
                    genreOut += el.name;
                }
            });
            if (!genreOut) {
                genreOut = "<i>Keine Daten</i>";
            }
            $(".genres").html(genreOut);
            $(".lastAiring").html(data.last_air_date);
            $(".status").html(data.status);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
});
