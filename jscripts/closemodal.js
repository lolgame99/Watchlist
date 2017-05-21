var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.getElementById('id01');
    if (event.target == modal) {
        clearCloseModal();
    }
}

$(function() {
    $(".cancelbtn").click(function(event) {
        clearCloseModal();
    });

    $(".subbut").click(function(event) {
        var username = $(".username").val();
        var password = $(".password").val();
        var url = "http://benni.dyndns.info:4841/Watchlist_API/api/user/login/" + username + ":" + password;

        if (!username && !password) {
            $(".logError").html("Bitte geben Sie alle Daten ein!");
            $(".logError").show();
        } else if (!password) {
            $(".logError").html("Bitte geben Sie ein Passwort ein!");
            $(".logError").show();
        } else if (!username) {
            $(".logError").html("Bitte geben Sie einen Benutzername ein!");
            $(".logError").show();
        } else {
            $.ajax({
                method: "GET",
                url: url,
                success: function(data) {
                    if (typeof data == "undefined") {
                        $(".logError").html("Benutzername und/oder Passwort falsch!");
                        $(".logError").show();
                    } else if (data.name == username && data.password == password) {
                        window.location.href = "index.html?u=" + data.key + "";
                    } else {
                        $(".logError").html("Benutzername und/oder Passwort falsch!");
                        $(".logError").show();
                    }

                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        }

    });

    $(".signupbtn").click(function(event) {
        var username = $(".regName").val();
        var email = $(".regEmail").val();
        var password1 = $(".regPassword").val();
        var password2 = $(".regPasswordR").val();

        var userkey = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 10; i++) {
            userkey += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        if (!username && !email) {
            $(".regError").html("Bitte geben Sie alle Daten ein!");
            $(".regError").show();
        } else if (!email) {
            $(".regError").html("Bitte geben Sie eine Email Adresse ein!");
            $(".regError").show();
        } else if (!username) {
            $(".regError").html("Bitte geben Sie einen Benutzername ein!");
            $(".regError").show();
        } else if (!password1 || !password2) {
            $(".regError").html("Bitte geben Sie ein Passwort ein!");
            $(".regError").show();
        } else if (password1 != password2) {
            $(".regError").html("Passwörter stimmen nicht überein");
            $(".regError").show();
        } else {
            var passwordR = password1;

            $.ajax({
                method: "GET",
                async: false,
                url: "http://benni.dyndns.info:4841/Watchlist_API/api/user/all",
                success: function(data) {
                    var double = false;
                    $.each(data.user, function(index, el) {
                        if (username == el.name) {
                            double = true;
                            $(".regError").html("Benutzername bereits verwendet");
                            $(".regError").show();
                        } else if (email == el.email) {
                            double = true;
                            $(".regError").html("Email bereits verwendet");
                            $(".regError").show();
                        }
                    });

                    if (!double) {
                        $.ajax({
                            method: "POST",
                            url: "http://benni.dyndns.info:4841/Watchlist_API/api/user/register",
                            contentType: "application/json",
                            data: '{"key":"' + userkey + '","name":"' + username + '","email":"' + email + '","password":"' + passwordR + '"}',
                            success: function(data) {
                                if (data == "Successfull") {
                                    window.location.href = "index.html?u=" + userkey;
                                } else {
                                    $(".regError").html("Fehlermeldung siehe Konsole");
                                    $(".regError").show();
                                    console.log(data);
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
    });

});

function clearCloseModal() {
    $("#id01").hide();
    $(".regName").val("");
    $(".regEmail").val("");
    $(".regPassword").val("");
    $(".regPasswordR").val("");
}
