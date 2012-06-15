var xmlHttp = createXmlHttpRequestObject();
	function createXmlHttpRequestObject()
	{
		var xmlHttp;
		if(window.ActiveXObject)
		{
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e) {
				xmlHttp = false;
			}
		}
		else
		{
			try {
				xmlHttp = new XMLHttpRequest();
			}
			catch (e) {
				xmlHttp = false;
			}
		}	
	if (!xmlHttp)
		alert("Error creating the XMLHttpRequest object.");
	else
		return xmlHttp;
	}

function validateFormOnSubmit(theForm) {
	var reason = "";

	pwd1 = encodeURIComponent(
	document.getElementById("pwd1").value);
	pwd2 = encodeURIComponent(
	document.getElementById("pwd2").value);

	if( pwd1 == "") {
		document.getElementById("pwderror").innerHTML = "<p>Error: You didn't enter a password.</p>";			
		return false;		
	}

	else if( pwd1.length < 3 ) {
		document.getElementById("pwderror").innerHTML = "<p>Error: Your password needs to be at least three characters long.</p>";			
		return false;		
	}

  	if (pwd1 != pwd2) {
		document.getElementById("pwderror").innerHTML = "<p>Error: Your password does not match.</p>";    	
		return false;
 	}
 	
	return true;
}

function formSubmit(homeurl)
	{
	// proceed only if the xmlHttp object isn't busy
	if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0)
	{
	// retrieve the name typed by the user on the form
	firstname = encodeURIComponent(
	document.getElementById("firstname").value);
	lastname = encodeURIComponent(
	document.getElementById("lastname").value);
	username = encodeURIComponent(
	document.getElementById("username").value);
	email = encodeURIComponent(
	document.getElementById("email").value);
	postal = encodeURIComponent(
	document.getElementById("postal").value);	
	if( document.getElementById("newsletter").checked == true){
	newsletter = encodeURIComponent(
	document.getElementById("newsletter").value);
	} else {
	newsletter = "no";		
	}
	userid = encodeURIComponent(
	document.getElementById("userid").value);	
	// execute the quickstart.php page from the server
	xmlHttp.open("GET", homeurl + "syp-account-update.php?id=" + userid + "&info=" + firstname + "-" + lastname + "-" + email + "-" + postal + "-" + newsletter, true);
	// define the method to handle server responses
	xmlHttp.onreadystatechange = handleServerResponse;
	// make the server request
	xmlHttp.send(null);
	}
	else
	// if the connection is busy, try again after one second
	setTimeout('formSubmit()', 1000);
	}
// callback function executed when a message is received from the
//server
function handleServerResponse()
{
// move forward only if the transaction has completed
if ( xmlHttp.readyState == 1 || xmlHttp.readyState == 2 || xmlHttp.readyState == 3 )
{
	document.getElementById("divMessage").innerHTML = "";
	document.getElementById("formtohide").style.display="none";
	document.getElementById("loader").style.display="block";	
	document.getElementById("accountsubmit").disabled="disabled";
	document.getElementById("accountsubmit").value="Updating...";	
}

if (xmlHttp.readyState == 4)
{
	// status of 200 indicates the transaction completed
	//successfully
	if (xmlHttp.status == 200)
	{
		// extract the XML retrieved from the server
		xmlResponse = xmlHttp.responseXML;
		// obtain the document element (the root element) of the XML
		//structure
		xmlDocumentElement = xmlResponse.documentElement;
		// get the text message, which is in the first child of
		// the the document element
		syprofile = xmlDocumentElement.firstChild.data;
		// display the data received from the server
		document.getElementById("formtohide").style.display="block";
		document.getElementById("loader").style.display="none";
		document.getElementById("accountsubmit").disabled="";
		document.getElementById("accountsubmit").value="Update Account";	
		if( syprofile == "200" ) {
			document.getElementById("divMessage").style.color="#00cc00";			
			document.getElementById("divMessage").innerHTML = "Account Successfully Updated!";
			//update the profile information so that when the collapse the box, it has been updated
				//TODO		
			//and clear the variables in the form
			document.getElementById("firstname").value="";
			document.getElementById("lastname").value="";
			document.getElementById("email").value="";
			document.getElementById("postal").value="";				
		} else {
			document.getElementById("divMessage").style.color="#cc0000";
			document.getElementById("divMessage").innerHTML = syprofile;			
		}
	} else {
		alert("There was a problem accessing the server: " + xmlHttp.statusText);
	}

	document.getElementById("formtohide").style.display="block";
	document.getElementById("loader").style.display="none";
	document.getElementById("accountsubmit").disabled="";
	document.getElementById("accountsubmit").value="Update Account";
}
}