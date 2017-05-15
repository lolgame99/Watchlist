$(function() {
    $("#searchedTable").hide();
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
                    name = $.trim(obj.name).substring(0, 25).split("").slice(0, -1).join("") + "...";
                } else {
                    name = obj.name;
                }
                if (number == 1) {
                    number = 2;
                    output += "<tr><td><div class='searchedEntry seriesLink' data-id='" + obj.id + "'>" + name + "</div></td>";
                } else if (number == 2) {
                    output += "<td><div class='searchedEntry seriesLink' data-id='" + obj.id + "'>" + name + "</div></td>";
                    number = 3;
                } else {
                    number = 1;
                    output += "<td><div class='searchedEntry seriesLink' data-id='" + obj.id + "'>" + name + "</div></td></tr>";
                }
            });
            output += "";
            $("#seriestable").html(output);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

    $("#seriesSearchInput").keyup(function(event) {

        $("#seriestable").hide();
        $("#searchedTable").show();
        searchTD();

    });
    $("#seriesSearchInput").blur(function(event) {
        $("#seriestable").hide();
        $("#searchedTable").show();
        searchTD();
    });
});

function searchTD() {
    // Declare variables 123
    var input, filter, table, tr, td, div, col, html;
    input = document.getElementById('seriesSearchInput');
    filter = input.value.toUpperCase();
    table = document.getElementById("seriestable");
    tr = table.getElementsByTagName('tr');
    col = 1;
    html = "";


    // Loop through all list items, and hide those who don't match the search query
    for (var d = 0; d < 3; d++) {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[d];
            div = td.getElementsByClassName("searchedEntry")[0];
            if (div) {
                if (div.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    if (col == 1) {
                        html += "<tr><td>";
                        html += $(div)[0].outerHTML;
                        html += "</td>";
                        col = 2;
                    } else if (col == 2) {
                        html += "<td>";
                        html += $(div)[0].outerHTML;
                        html += "</td>";
                        col = 3;
                    } else if (col == 3) {
                        html += "<td>";
                        html += $(div)[0].outerHTML;
                        html += "</td></tr>";
                        col = 1;
                    }
                }
            }
        }
    }
    if (col != 3) {
        html += "</tr>";
    }
    $("#searchedTable").html(html);

}
