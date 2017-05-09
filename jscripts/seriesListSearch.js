$(function() {
    $.ajax({
        method: "GET",
        url: "http://benni.dyndns.info:4841/Watchlist_API/api/series/all",
        beforeSend: function() {
            $("#seriestable").html("<div class='loader'>Loading...</div>");
        },
        success: function(data) {
            var number = 1;
            var output = "";
            var name = "";
            $.each(data.series, function(id, obj) {
                if (obj.name.length > 35) {
                    name = $.trim(obj.name).substring(0, 35).split("").slice(0, -1).join("") + "...";
                } else {
                    name = obj.name;
                }
                if (number == 1) {
                    number = 2;
                    output += "<tr><td class='tcol'><div class='searchedEntry seriesLink' data-id='" + obj.id + "'>" + name + "</div></td>";
                } else if (number == 2) {
                    output += "<td class='tcol'><div class='searchedEntry seriesLink' data-id='" + obj.id + "'>" + name + "</div></td>";
                    number = 3;
                } else {
                    number = 1;
                    output += "<td class='tcol'><div class='searchedEntry seriesLink' data-id='" + obj.id + "'>" + name + "</div></td></tr>";
                }
            });
            output += "";
            $("#seriestable").html(output);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

    $("#seriesSearchInput").keypress(function(event) {
        if (event.which == 13) {
            $("#seriestable td.tcol:contains('" + $(this).val() + "')").parent().show();
            $("#seriestable td.tcol:not(:contains('" + $(this).val() + "'))").parent().hide();
        }
    });

    $("#seriesSearchInput").focusout(function(event) {
        $("#seriestable td.tcol:contains('" + $(this).val() + "')").parent().show();
        $("#seriestable td.tcol:not(:contains('" + $(this).val() + "'))").parent().hide();
    });
});
