$(function() {
    var user = $.url("?u");
    var id = $.url("?id");
    $.ajax({
        method: "GET",
        url: "https://api.themoviedb.org/3/tv/" + id + "?api_key=02315c61f82284303a120d89ce93baa4&language=de",
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
            var title = data.name + " - Watchlist";
            $("title").html(title);
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
            $(".voteCount").append("(" + data.vote_count + "):");

            var averageRating = Math.round(data.vote_average);

            for (var i = 0; i < averageRating; i++) {
                $(".star_wrapper").append("<img class='star' src='resources/stern_pink.ico' alt='fullStar'>");
            }
            for (var i = 0; i < 10 - averageRating; i++) {
                $(".star_wrapper").append("<img class='star' src='resources/stern_weiss.ico' alt='emptyStar'>");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
});
