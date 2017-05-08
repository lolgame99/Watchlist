$(function() {
    $.ajax({
        method: "GET",
        url: "http://benni.dyndns.info:4841/Watchlist_API/api/series/all",
        beforeSend: function() {
            $(".searchedSeriesList").html("<div class='loader'>Loading...</div>");
        },
        success: function(data) {
            var number = 1;
            var output = "<tr>";
            var name = "";
            $.each(data.series, function(id, obj) {
                if (obj.name.length > 35) {
                    name = $.trim(obj.name).substring(0, 35).split("").slice(0, -1).join("") + "...";
                } else {
                    name = obj.name;
                }

                if (number < 4) {
                    output += "<td><div class='searchedEntry seriesLink' data-id='" + obj.id + "'>" + name + "</div></td>";
                    number += 1;
                } else {
                    number = 2;
                    output += "</tr><tr><td><div class='searchedEntry seriesLink' data-id='" + obj.id + "'>" + name + "</div></td>";
                }
            });
            output += "</tr>";
            $(".searchedSeriesList").html(output);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
});
