$(function() {
    var user = $.url("?u");
    var series = "";
    $.ajax({
        method: "GET",
        url: "http://benni.dyndns.info:4841/Watchlist_API/api/user/list/" + user,
        success: function(data) {
            var output = "";
            var watchIndex = 1;
            var finishIndex = 1;
            var cancelIndex = 1;
            var planIndex = 1;
            $.each(data.listEntry, function(id, obj) {
                if (obj.status == 1) { //Watching
                    output = "";
                    if (watchIndex == 1) {
                        $("#watchTable").html("");
                    }
                    output += "<tr><td>" + watchIndex + "</td><td><div class='seriesLink' data-id='" + obj.seriesid + "'>" + obj.seriesname + "</div><p class='small' data-seriesid='" + obj.seriesid + "'>Ändern</p></td><td>" + obj.score + "</td><td>" + obj.seasonp + "</td><td>" + obj.episodep + "</td></tr>";
                    watchIndex += 1;
                    $("#watchTable").append(output);
                } else if (obj.status == 2) { //Finished
                    output = "";
                    if (finishIndex == 1) {
                        $("#finishTable").html("");
                    }
                    output += "<tr><td>" + finishIndex + "</td><td><div class='seriesLink' data-id='" + obj.seriesid + "'>" + obj.seriesname + "</div><p class='small' data-seriesid='" + obj.seriesid + "'>Ändern</p></td><td>" + obj.score + "</td><td>" + obj.seasonp + "</td><td>" + obj.episodep + "</td></tr>";
                    finishIndex += 1;
                    $("#finishTable").append(output);
                } else if (obj.status == 3) { //Canceled
                    output = "";
                    if (cancelIndex == 1) {
                        $("#cancelTable").html("");
                    }
                    output += "<tr><td>" + cancelIndex + "</td><td><div class='seriesLink' data-id='" + obj.seriesid + "'>" + obj.seriesname + "</div><p class='small' data-seriesid='" + obj.seriesid + "'>Ändern</p></td><td>" + obj.score + "</td><td>" + obj.seasonp + "</td><td>" + obj.episodep + "</td></tr>";
                    cancelIndex += 1;
                    $("#cancelTable").append(output);
                } else if (obj.status == 4) { //Plan
                    output = "";
                    if (planIndex == 1) {
                        $("#planTable").html("");
                    }
                    output += "<tr><td>" + planIndex + "</td><td><div class='seriesLink' data-id='" + obj.seriesid + "'>" + obj.seriesname + "</div><p class='small' data-seriesid='" + obj.seriesid + "'>Ändern</p></td><td>" + obj.score + "</td><td>" + obj.seasonp + "</td><td>" + obj.episodep + "</td></tr>";
                    planIndex += 1;
                    $("#planTable").append(output);
                }

            });
            $("table").tablesorter();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

    $("#seriesSearchInput").keyup(function(event) {
        //TODO:Search function

    });

    $(".cancelbtn").click(function(event) {
        $(".modal").hide();
    });

    $("body").on('click', '.small', function(event) {
        $(".modal").show();
        series = $(this).data("seriesid");
    });

    $(".changebtn").click(function(event) {
        changeSeries(user, series);
    });

    $(".logout").click(function(event) {
        window.location.href = "index.html";
    });
});

function changeSeries(user, series) {

    var seriesS = series.toString();

    if ($(".chScore").val() > 10) {
        $(".error").html("Bitte geben Sie einen Score bis maximal 10 ein!");
        $(".error").show();
        return;
    }

    $.ajax({
        method: "GET",
        url: "http://benni.dyndns.info:4841/Watchlist_API/api/user/list/" + user,
        success: function(data) {
            var status = null;
            var score = null;
            var seasonp = null;
            var episodep = null;

            $.each(data.listEntry, function(id, obj) {
                if (obj.seriesid == seriesS) {
                    status = obj.status;
                    score = obj.score;
                    seasonp = obj.seasonp;
                    episodep = obj.episodep;
                }
            });

            if ($(".chScore").val()) {
                score = $(".chScore").val();
            }
            if ($(".chSeasonp").val()) {
                seasonp = $(".chSeasonp").val();
            }
            if ($(".chEpisodep").val()) {
                episodep = $(".chEpisodep").val();
            }
            if ($(".chStatus").val()) {
                status = $(".chStatus").val();
            }

            var transmit = '{"userkey":"' + user + '","score":"' + score + '","seriesid":"' + seriesS + '","status":"' + status + '", "episodep":"' + episodep + '","seasonp":"' + seasonp + '"}';
            $.ajax({
                method: "POST",
                url: "http://benni.dyndns.info:4841/Watchlist_API/api/user/list/change",
                contentType: "application/json",
                data: transmit,
                success: function(data) {
                    window.location.href = "account.html?u=" + user;
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });


}
