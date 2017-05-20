$(function() {
    var user = $.url("?u");

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
                    output += "<tr><td>" + watchIndex + "</td><td><div class='seriesLink' data-id='" + obj.seriesid + "'>" + obj.seriesname + "</div><p class='small'>Ändern</p></td><td>" + obj.score + "</td><td>" + obj.seasonp + "</td><td>" + obj.episodep + "</td></tr>";
                    watchIndex += 1;
                    $("#watchTable").append(output);
                } else if (obj.status == 2) { //Finished
                    output = "";
                    if (finishIndex == 1) {
                        $("#finishTable").html("");
                    }
                    output += "<tr><td>" + finishIndex + "</td><td><div class='seriesLink' data-id='" + obj.seriesid + "'>" + obj.seriesname + "</div><p class='small'>Ändern</p></td><td>" + obj.score + "</td><td>" + obj.seasonp + "</td><td>" + obj.episodep + "</td></tr>";
                    finishIndex += 1;
                    $("#finishTable").append(output);
                } else if (obj.status == 3) { //Canceled
                    output = "";
                    if (cancelIndex == 1) {
                        $("#cancelTable").html("");
                    }
                    output += "<tr><td>" + cancelIndex + "</td><td><div class='seriesLink' data-id='" + obj.seriesid + "'>" + obj.seriesname + "</div><p class='small'>Ändern</p></td><td>" + obj.score + "</td><td>" + obj.seasonp + "</td><td>" + obj.episodep + "</td></tr>";
                    cancelIndex += 1;
                    $("#cancelTable").append(output);
                } else if (obj.status == 4) { //Plan
                    output = "";
                    if (planIndex == 1) {
                        $("#planTable").html("");
                    }
                    output += "<tr><td>" + planIndex + "</td><td><div class='seriesLink' data-id='" + obj.seriesid + "'>" + obj.seriesname + "</div><p class='small'>Ändern</p></td><td>" + obj.score + "</td><td>" + obj.seasonp + "</td><td>" + obj.episodep + "</td></tr>";
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

});
