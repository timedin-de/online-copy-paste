function postRequest(url,values, onloadFunc) {
	var req = new XMLHttpRequest();
    req.open('POST', url, true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.onload = function () {
    	onloadFunc(this)
    };
    req.send(values); 
}
function getRequest(url, onloadFunc) {
	var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	req.onload = function () {
	    onloadFunc(this)
	};
    req.send(); 
}

// Preset Scripts

function decodeHTML(text) {
  return text
      .replaceAll("&amp;", "&")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&quot;", "\"")
      .replaceAll("&#92;", "\\")
      .replaceAll("&#039;", "\'");
}		
var array;
var value = "";
var interval;

window.onload = function() {
	//Send Request to tell new user
	postRequest("resources/communication","newJoin", function (self) {
	var resp = self.responseText;
	var array = JSON.parse(resp);
	if(array.state == "error") {
			alert("Ein Fehler ist aufgetreten: " + array.errorFull);
			location.reload();
		}
	});

	UpdaterInt = window.setInterval(function() {
		document.getElementById("syncing").innerHTML = "Syncing...";
		getRequest("resources/communication", function (self) {
            var resp = self.responseText;
            array = JSON.parse(resp);
            if(array.state == "error") {
                alert("Ein Fehler ist aufgetreten: " + array.errorFull);
                location.reload();
            }
            if(array.state == "success") {
            	value = array.value;
            	if(value != document.getElementById("In-Output").value) {
					var map = {
						'&': '&amp;',
					    '<': '&lt;',
					    '>': '&gt;',
					    '"': '&quot;',
					    "'": '&#039;',
					    "\n": "\\n"
					};  
					document.getElementById("In-Output").value=decodeHTML(value);
            	}
            }
            document.getElementById("syncing").innerHTML = "";
            if(array.newJoin) {
            	document.getElementById("newJoin").innerHTML = "Neuer Besucher*in";
            } else {
				document.getElementById("newJoin").innerHTML = "";
            }
        });
	}, 2000); 
}
function send(self) {
	value = self.value;
	document.getElementById("syncing").innerHTML = "Syncing...";
	postRequest("resources/communication","value="+value, function (self) {
        var resp = self.responseText;
        console.log(resp);
        var array = JSON.parse(resp);
        if(array.state == "error") {
            alert("Ein Fehler ist aufgetreten: " + array.errorFull);
            location.reload();
        }
    });
}
			