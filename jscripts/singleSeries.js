var user = $.url("?u");
var id = $.url("?id");
var status = 0;
var name = "";
$(function() {
    loadInfo();

    $("#watching").click(function(event) {
        status = 1;
        addListEntry();
    });

    $("#done").click(function(event) {
        status = 2;
        addListEntry();
    });

    $("#cancel").click(function(event) {
        status = 3;
        addListEntry();
    });

    $("#add").click(function(event) {
        status = 4;
        addListEntry();
    });
});

function loadInfo() {
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
            name = data.name;
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
}

function addListEntry() {
    var double = false;
    $.ajax({
        method: "GET",
        url: "http://benni.dyndns.info:4841/Watchlist_API/api/user/list/" + user,
        success: function(data) {
            try {
                $.each(data.listEntry, function(i, obj) {
                    if (obj.seriesid == id) {
                        $(".error").html("Diese Serie befindet sich bereits in Ihrer Liste");
                        $(".error").show();
                        double = true;
                    }
                });
            } catch (e) {
                double = false;
            }

            if (!double) {
                $.ajax({
                    method: "POST",
                    url: "http://benni.dyndns.info:4841/Watchlist_API/api/user/list/add",
                    encoding: "UTF-8",
                    contentType: "application/json;charset=URF-8",
                    data: '{"userkey":"' + user + '","seriesname":"' + name + '","seriesid":"' + id + '","status":"' + status + '"}',
                    success: function(data) {
                        if (data == "Successful") {
                            window.location.href = "account.html?u=" + user;
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(textStatus, errorThrown);
                    }
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });


}
