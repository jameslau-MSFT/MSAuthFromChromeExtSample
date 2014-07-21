

function sendToOneNote(access_token, title, text, url) {
	 $.ajax({
		accept: "application/json",
		type: "POST",
		url: "https://www.onenote.com/api/v1.0/pages",
		headers: { "Authorization": "Bearer " + access_token },
		data: "<html><head><title>"+ title +"</title></head>" + 
			"<body><p>" + text + "</p>" +
			"<p>Source URL: " + url +"</p>" +
			"</body></html>",
		contentType: "text/html",
		success: function (data, status, xhr) {
			showSuccess();
			
		},
		complete: function (data, status, xhr) {
			//alert(status);
		},
		 error: function (request, status, error) {
			alert(status);
		}
	 });


}


function getAccessTokenFromStorage() {
	chrome.storage.local.get("access_token", function(result) {
		if ( result.access_token != null ) {
			alert(result.access_token);
		}
	
	});

}

// Watches for the Live Login Popup to store token and closes the wnidow.
$(window).load(function() {
	
	
	if (window.location.origin == "https://login.live.com") {
		var hash = window.location.hash;
		// get access token
		var start = hash.indexOf("#access_token=");
		if ( start >= 0 ) {
			start = start + 14;
		
			var end = hash.indexOf("&token_type");
			
			var access_token = hash.substring(start, end);
			//alert(access_token);
			
			// Store it
			chrome.storage.local.set({"access_token":access_token}); 
			
			// Close the window
			window.close();
		}
		
		
	}
});


