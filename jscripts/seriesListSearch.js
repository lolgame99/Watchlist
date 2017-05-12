$(function() {
    $("body").on('click', '.seriesLink', function(event) {
        var id = $(this).data('id');
        window.location.href = "viewSeries.html?id=" + id + "";
    });

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
        var filter = search();
        console.log(filter);
    });

    $("#seriesSearchInput").focusout(function(event) {
        var filter = search();
        console.log(filter);
    });
});

function search() {
    var data = $("#seriesSearchInput").val().split(" ");

    $("#seriestable td.tcol").hide();

    if ($(this).value == "") {
        $("#seriestable td.tcol").show();
        return;
    }

    $("#seriestable td.tcol").filter(function(i, v) {
        var $t = $(this);
        for (var d = 0; d < data.length; ++d) {
            if ($t.text().toLowerCase().indexOf(data[d].toLowerCase()) > -1) {
                return true;
            }
        }
        return false;
    }).show();
}
