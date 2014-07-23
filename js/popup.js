
function sendToOneNote(access_token, title, text) {
	 $.ajax({
		accept: "application/json",
		type: "POST",
		url: "https://www.onenote.com/api/v1.0/pages",
		headers: { "Authorization": "Bearer " + access_token },
		data: "<html><head><title>"+ title +"</title></head>" + 
			"<body><p>" + text + "</p>" +
			"</body></html>",
		contentType: "text/html",
		success: function (data, status, xhr) {
			alert(status);
			
		},
		complete: function (data, status, xhr) {
			alert(status);
		},
		 error: function (request, status, error) {
			alert(status);
		}
	 });


}

$('a#signout').click(function() {
	WL.init({
		client_id: "000000004410CD1A",
		redirect_uri: "https://login.live.com/oauth20_desktop.srf",
		response_type: "token"
	});
	WL.logout();
	chrome.storage.local.remove("access_token");
	return false;
});

$('a#createOneNotePage').click(function() {

	chrome.storage.local.get("access_token", function(result) {
		if ( result.access_token != null ) {
			sendToOneNote(result.access_token, "MSA Auth Sample", "This is proof that the authentication was successful.");
		} else {
			alert('Please sign in first before clicking this link.');
		}
	
	});
	return false;		// Don't forget to return false, otherwise the AJAX request will be cancelled.
});		
			
$('a#signin').click(function() {
	$('div#signin_status').text('');
	WL.init({
		client_id: "000000004410CD1A",
		redirect_uri: "https://login.live.com/oauth20_desktop.srf",
		response_type: "token"
	});
	WL.login({
        scope: ["wl.signin", "office.onenote_create"]
    });
	
	return false;

});