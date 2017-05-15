var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.getElementById('id01');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$(function() {
    $(".error").hide();

    $(".subbut").click(function(event) {
        var username = $(".username").val();
        var password = $(".password").val();
        var url = "http://benni.dyndns.info:4841/Watchlist_API/api/user/login/" + username + ":" + password;

        if (!username && !password) {
            $(".error").html("Bitte geben Sie alle Daten ein!");
            $(".error").show();
        } else if (!password) {
            $(".error").html("Bitte geben Sie ein Passwort ein!");
            $(".error").show();
        } else if (!username) {
            $(".error").html("Bitte geben Sie einen Benutzername ein!");
            $(".error").show();
        } else {
            $.ajax({
                method: "GET",
                url: url,
                success: function(data) {
                    if (typeof data == "undefined") {
                        $(".error").html("Benutzername und/oder Passwort falsch!");
                        $(".error").show();
                    } else if (data.name == username && data.password == password) {
                        window.location.href = "index.html?u=" + data.key + "";
                    } else {
                        $(".error").html("Benutzername und/oder Passwort falsch!");
                        $(".error").show();
                    }

                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        }

    });

});
