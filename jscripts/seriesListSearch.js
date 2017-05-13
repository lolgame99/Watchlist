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
                    name = $.trim(obj.name).substring(0, 25).split("").slice(0, -1).join("") + "...";
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

    $("#seriesSearchInput").keyup(function(event) {
        search();
    });
});

function search() {
    var data = $("#seriesSearchInput").val().split(" ");

    $("#seriestable tr").hide();

    if ($(this).value == "") {
        $("#seriestable tr").show();
        return;
    } else {
        $("#seriestable tr").filter(function(i, v) {
            var $t = $(this);
            for (var d = 0; d < data.length; ++d) {
                if ($t.text().toLowerCase().indexOf(data[d].toLowerCase()) > -1) {
                    return true;
                }
            }
            return false;
        }).show();
    }
    searchOld();

}

function searchOld() {
    // Declare variables 123
    var input, filter, table, tr, td, nav, i;
    input = document.getElementById('seriesSearchInput');
    filter = input.value.toUpperCase();
    table = document.getElementById("seriestable");
    tr = table.getElementsByTagName('tr');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        nav = td.getElementsByClassName("searchedEntry")[0];
        if (nav) {
            if (nav.innerHTML.toUpperCase().indexOf(filter) > -1) {
                nav.style.display = "";
            } else {
                nav.style.display = "none";
            }
        }
    }
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        nav = td.getElementsByClassName("searchedEntry")[0];
        if (nav) {
            if (nav.innerHTML.toUpperCase().indexOf(filter) > -1) {
                nav.style.display = "";
            } else {
                nav.style.display = "none";
            }
        }
    }
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];

        nav = td.getElementsByClassName("searchedEntry")[0];
        if (nav) {
            if (nav.innerHTML.toUpperCase().indexOf(filter) > -1) {
                nav.style.display = "";
            } else {
                nav.style.display = "none";
            }
        }
    }
}
