$(function() {
	/*
	FIXME: Fix cross-domain issue
	*/
	$.ajax({
		async: true,
		crossDomain: true,
		url: 'https://api.thetvdb.com/login',
		method: 'POST',
		headers: {
	  	    "content-type": "application/json"
		},
		processData: false,
		dataType: 'json',
		data: '{"apikey":"A0DF29F3383CE7DE","userkey":"680643EEC4B72B67","username":"_lolgame_"}',
		complete: function(data) {
			var jwt = "Bearer " + data;
			alert(JSON.stringify(data));
		}
	});
});
