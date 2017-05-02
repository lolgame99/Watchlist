$(function() {
	var output = "";
	$.getJSON("resources/news.json", function(data) {
		$.each(data.entries, function(i, obj) {
			output+="<h4>"+obj.head+" , "+obj.date+"</h4>";
			output+=obj.text;
			if (!i+1==data.entries.length) {
				output+="<div class='spacer'></div>"
			}
		});
		$("#sitenews").html(output);
	});
});
