// ***************************************************/
// Encodes URL to transmit + and spaces
// ***************************************************/
var chart;
$(document).ready(function() {
		// First table
		$('#ktable1 td').graphup({
			colorMap: 'greenPower',
			callBeforePaint: function() {
				// Add a special CSS class to the top 50%
				if (this.data('percent') >= 10) {
					this.addClass('top50');
				}
			}
		});

		// Second table
		// Wrap each cell's value in a span element
		$('#ktable2 td').wrapInner('<span/>').graphup({
			colorMap: 'burn',
			callBeforePaint: function() {
				// Make opacity match the percentage
				$('span', this).css('opacity', this.data('percent') / 100);
			}
		});
	});
	
	
	// *** When document is ready
$(document).ready(function ()
{
  //getRpbs();
    loadIPMITermServerPage();
         //loadBuildTestResultsPage();
     //getIOStatData();
     //h1();
		//plotGraph7();
		//getIOStatReadData();
 
});


function urlencode(str) {return encodeURI(str); }


function urldecode(str) {return decodeURI(str); }
function isValidRegExStr(str, regExStr) { return regExStr.test(str); }

function isValidWholeNumber(str)
{
	var regex = /^\s*\d+\s*$/;
	return regex.test(str);
}
function isValidEmail(str)
{
  var regex = /^[-_.a-z0-9]+@(([-_a-z0-9]+\.)+(ad|ae|aero|af|ag|ai|al|am|an|ao|aq|ar|arpa|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|biz|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|com|coop|cr|cs|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|in|info|int|io|iq|ir|is|it|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mil|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|name|nc|ne|net|nf|ng|ni|nl|no|np|nr|nt|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pro|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|(([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\.){3}([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]))$/i;
  return regex.test(str);
}
function isValidName(str)
{
	var regex = /^[^ ][a-zA-Z ]+$/;
	return regex.test(str);
}
function getTableColumn(content)
{
	return '<td>' + content + '</td>';
}

function printNA(str) {

  if(str == null) {
        return "N/A";
  }
  return str
}

// *** Is executed once the webpage is fully loaded.
$(window).load(function () 
{
	
});


/**
 * This updates the Webpage's side-bar given HTML content
 */
function updateSideBar(theContent)
{
	$("#sideBarSiteDiv").html(theContent);
}

/**
 * This modifies the temporary HTML DIV used to output Error Messages or Temporary notificaitons to the user
 */
function prependMainContent(theContent, timeout)
{
	//TODO when multiple calls are made, dismissible alert doesn't display for full 5 seconds
	var topDiv = $("#mainContentSiteDivTopMsg");
    topDiv.html("");
	topDiv.html(theContent).show();
	if(!timeout) {
        timeout = 5000;
    }
		setTimeout(function () {
			// TODO: test this function when multiple alerts are displayed
			topDiv.fadeOut(500);
		}, timeout);
}

/**
 * This updates the webpage's main content area
 */
function updateMainContent(theContent)
{
	$("#mainContentSiteDiv").html(theContent);
	// prependMainContent('');
}
// This updates the Top Navigation Webpage Area
function updateTopBar(theContent)
{
	$("#TopBarSiteDiv").html(theContent);
}

function displayErrorToUser(errorInfo)
{
	prependMainContent(getDismissibleAlert("Error", errorInfo, "error"), 5000);
}

// Gets a dismissable alert message to the user given its title, message, and alertType, which could be "info", "warning", or "error"
function getDismissibleAlert(title, msg, alertType)
{
	var alert = '<div class="alert alert-block alert-' + alertType + ' fade in">';
		alert += '<a class="close" data-dismiss="alert" href="#">&times;</a>';
		alert += '<strong>' + title + '</strong></BR>' + msg;
		alert += '</div>';
		
	return alert;
}

// Gets a wrapped text inside an "alert-info" div of Bootstrap CSS
function getWrappedText(text)
{
	var content = '<div class="alert alert-info">';
		content += text;
		content += '</div>';
		
	return content;
}

// This shows a splash screen
// display: If true, displays the splash screen, otherwise hides it
// message: Optional parameter of message, if null, "Loading . . ." message is displayed
function displayLoadingSplashScreen(display, message)
{
    // TODO 
	// alert(message);
	// (display) ? showPopupModal(message ? message : "Loading", "", "", "150") : hidePopupModal();
}

// Sends Ajax request
// action: The action to send to phpjs.php web-page
// postVars: The post variables to send to phpjs.php
// funcAfterSuccess, the function to execute after successful ajax response
//						This function is given AJAX's response
// funcUponFailure: Optional failure function to execute, otherwise generic
//					 failure message is displayed using prependMainContent()
function sendAjaxRequest(action, postVars, funcAfterSuccess, funcUponFailure)
{
	varsToSend = 'action=' + urlencode(action);
	if("" != postVars) {
		varsToSend += '&' + urlencode(postVars);
	}
	
	$.ajax({
		url: 'phpjs.php',
		data: varsToSend,
		dataType: 'json',
		type: 'post',
		async:false,
		cache: false,
		success: function (response) 
		{
			displayLoadingSplashScreen(false);
			var htmlContent = "";
			if(response.ok)
			{
            
                //alert("HELLLLLL");
				funcAfterSuccess(response);
			}
			else
			{
				if(funcUponFailure) {
					funcUponFailure(response);
				}
				else {
					prependMainContent(getDismissibleAlert("Error processing: "+action, response.msg, "error"), 5000);
				}
			}
		}
	}); 
}

// This function is called to initiate logout, which sends AJAX request to destroy the session and reload the page.
function performLogout()
{
	sendAjaxRequest("logout", "", function(r) {window.location.reload(false);} );
}

// This function is called to attempt a login which picks up Username and Password Form setup by index.php
function attempt_login()
{
	var username = $('#loginUsername').val();
    
    if (isValidEmail(username)) {
     alert("email id passed, please pass without @virident.com");
     return 1;
    }
	var postVars = 'username='+username  + '&password=' + $('#password').val();
	sendAjaxRequest("login", postVars, 
					function(response) {
						updateTopBar(response.navBarData);
						updateSideBar(response.sideBarData);
					});
}

function showRegistrationModal()
{
	var body = '<input class="span3" type="text" placeholder="Email" name="newReg_email" value="" id="newReg_email" /></BR>\
				<input class="span3" type="password" placeholder="Password" name="newReg_password" value="" id="newReg_password" /></BR>\
				<label>Your information</label>\
				<input class="span3" type="text" placeholder="First Name" name="newReg_firstName" value="" id="newReg_firstName" /></BR>\
				<input class="span3" type="text" placeholder="Last Name" name="newReg_lastName" value="" id="newReg_lastName" /></BR>';
				
	var heading = 	'<button class="btn btn-success" onClick="javascript: register_user()" name="submit"><i class="icon-share-alt icon-white"></i>&nbsp;<b>Register</b></button>\
					<button class="btn btn-warning" onClick="javascript: hidePopupModal()" name="submit"><i class="icon-remove icon-white"></i>&nbsp;<B>Cancel</b></button>';
		
    // TODO : showPopupModal()	
    // TODO : hidePopupModal()	
	// showPopupModal("Sign-Up", body, heading, "300");
}
/**
 * This shows a Pop-up modal given the contents of heading, body, and footer.
 * Another way to use this function is not pass in any parameters, in which 
 * case, it will dismplay display the previous modal with previous parameters.
 * For example: 
 *    showPopupModal("heading, "body", "footer");
 *    hidePopupModal();
 *    // At some point later:
 *    showPopupModal(); // Redisplay previous modal
 */
function showPopupModal(heading, body, footer, pixelWidth)
{
	// No parameters?  Simply show previous modal and return
	if(!heading) {
		$('#actualPopupModalDivID').modal('show');
		return;
	}
	
	var footerContent = "";
	if(footer && "" != footer) {
		footerContent += '<div class="modal-footer"><form onsubmit="return false;">' + footer + '</form></div>';
	}
	
	var templateContent = '\
	<div class="modal" id="actualPopupModalDivID">\
		<div class="modal-header">\
			<a class="close" data-dismiss="modal" onClick="javascript: hidePopupModal();">x</a>\
			<h3>'+heading+'</h3>\
		</div>\
		<div class="modal-body">' + body + '</div>' + 
			footerContent +
	'</div>';
	
	// Display the Modal HTML inside the popupModalDiv set @ index.php
	$('#popupModalDiv').html(templateContent);
	
	// Now that Modal HTML is displayed, turn this HTML into actual Modal
	$('#actualPopupModalDivID').modal({
		keyboard: true
	}).css({
		width: pixelWidth ? pixelWidth+'px' : '500px',
		'margin-left': function () { return -($(this).width() / 2); }
	});
}

/**
 * This hides the popup Modal
 */
function hidePopupModal() 
{
	$('#actualPopupModalDivID').modal('hide');
	$('#popupModalDiv').html("");
}


// This returns a generic form with a textarea inside of it.
// the span is used to determine the span of the textarea
// contentAfterForm is any content to display after the form, such as a button
// textareaContents is what the textarea input should be set to.
function getGenericForm(textAreaDivID, span, contentAfterForm, textareaContents)
{
	var form = '<div class="row"><div class="span' + span+1 + '">';
	form  += 	    '<div class="alert alert-success">';
	form  += 		'<textarea  style="resize:none" id="' + textAreaDivID + '" name="' + textAreaDivID + '" class="span' + span + '">';
	if(textareaContents != undefined) 
		form  +=			textareaContents
		
	form  +=		'</textarea></br>';
	form  += 		contentAfterForm;
	form  += 		'</div>';
	form  += '</div></div>';
	return form;
}

// This function is called when a user initiates a search from NavBar
function search()
{
	var searchStr = $('#searchStr').val();
	sendAjaxRequest("searchProduct", "searchStr="+searchStr,
						 function(response) {
							alert("Search not implemented yet!");
						 });
}

function attempt_pwcyle()
{
    /* Grab the fields first before hiding the popup modal */
	var rpb = $('#restart_MachineRpb').val();
	var port = $('#restart_MachinePort').val();
    
    hidePopupModal();
	if(rpb == "" || port == "")
	{
		showPopupModal("Error", "Form fields are invalid", "", "300");
		return;
	}
	else {
        var postVars = "rpb=" + rpb + "&port=" + port;
        sendAjaxRequest("get_power_cycle", postVars, 
                        function(response) {
                            updateMainContent(response.msg);
                        });
	}
}
function loadPowerCyclePage()
{
	var fields =  '<label>Machine Info</label>\
				<input class="span3" type="text" placeholder="Machine RPB" name="restart_MachineRpb" value="" id="restart_MachineRpb" /></BR>\
				<input class="span3" type="text" placeholder="Port"         name="restart_MachinePort" value="" id="restart_MachinePort" /></BR>';
	
	var body = fields;
	
	var footer = '<button class="btn btn-success" onClick="javascript: attempt_pwcyle();" name="submit"><i class="icon-share-alt icon-white"></i>&nbsp;<b>Reboot!</b></button>\
					<button class="btn btn-warning" onClick="javascript: hidePopupModal()" name="submit"><i class="icon-remove icon-white"></i>&nbsp;<B>Cancel</b></button>';
					
	showPopupModal("Power-Cycle", body, footer, "300");
}

function loadUpdateIPMIPage()
{
	var fields =  '<label>IPMI Info</label>\
	            <input class="span3" type="text" placeholder="Machine name or ip addr"    name="machine_addr" value="" id="machine_addr" /></BR>\
				<input class="span3" type="text" placeholder="Machine IPMI ip addr"    name="machine_ipmi" value="" id="machine_ipmi" /></BR>\
				<input class="span3" type="text" placeholder="User id"         name="ipmi_user_id" value="" id="ipmi_user_id" /></BR>\
				<input class="span3" type="text" placeholder="Password"         name="ipmi_passwd" value="" id="ipmi_passwd" /></BR>';
	
	var body = fields;
	
	var footer = '<button class="btn btn-success" onClick="javascript: update_ipmi_info();" name="submit"><i class="icon-share-alt icon-white"></i>&nbsp;<b>Update!</b></button>\
					<button class="btn btn-warning" onClick="javascript: hidePopupModal()" name="submit"><i class="icon-remove icon-white"></i>&nbsp;<B>Cancel</b></button>';
	
    sendAjaxRequest("check_user_login", "",	
                   function(response) {
                        if(response.loggedin) {			
	                       showPopupModal("Update-IPMI-Info", body, footer, "300");
						 }
						 else {
                            showPopupModal("Not Logged In!", "You need to be logged in to update ipmi", "", "300");
                        }
    });
}




function insertMachinePage()
{
   var fields =  '<label>Enter Machine Info</label>\
	            <input class="span3" type="text" placeholder="Machine name"    name="machine_name" value="" id="machine_name" /></BR>\
				<input class="span3" type="text" placeholder="optional .. ip addr "    name="mIPaddr" value="" id="mIPaddr" /></BR>\
				<input class="span3" type="text" placeholder="optional .os Type Linux,Windows,ESXi "    name="osType" value="" id="osType" /></BR>\
				<input class="span3" type="text" placeholder="optional total Memory ..eg. 24G "    name="totalMemory" value="" id="totalMemory" /></BR>\
				<input class="span3" type="text" placeholder="optional total Cpus ..eg. 24 "    name="totalCpus" value="" id="totalCpus" /></BR>\
				<input class="span3" type="text" placeholder="optional cpuType ..eg.Intel E5540@2.53GHz"    name="cpuType" value="" id="cpuType" /></BR>';
				
				

	
	var body = fields;
	
	var footer = '<button class="btn btn-success" onClick="javascript: enter_machine_info();" name="submit"><i class="icon-share-alt icon-white"></i>&nbsp;<b>Enter!</b></button>\
					<button class="btn btn-warning" onClick="javascript: hidePopupModal()" name="submit"><i class="icon-remove icon-white"></i>&nbsp;<B>Cancel</b></button>';
	
    sendAjaxRequest("check_user_login", "",	
                   function(response) {
                        if(response.loggedin) {			
	                       showPopupModal("Machine-Info", body, footer, "300");
						 }
						 else {
                            showPopupModal("Not Logged In!", "You need to be logged in to enter machine info", "", "300");
                        }
    });

}

function insertCardPage()
{
   var fields =  '<label>Enter Card Info</label>\
	            <input class="span3" type="text" placeholder="Card Serial"    name="card_serial" value="" id="card_serial" /></BR>\
				<input class="span3" type="text" placeholder="2.2TB or 550G "    name="card_type" value="" id="card_type" /></BR>\
				<input class="span3" type="text" placeholder="optional machine name"    name="machine_name" value="" id="machine_name" /></BR>';
				
				
				

	
	var body = fields;
	
	var footer = '<button class="btn btn-success" onClick="javascript: enter_card_info();" name="submit"><i class="icon-share-alt icon-white"></i>&nbsp;<b>Enter!</b></button>\
					<button class="btn btn-warning" onClick="javascript: hidePopupModal()" name="submit"><i class="icon-remove icon-white"></i>&nbsp;<B>Cancel</b></button>';
	
    sendAjaxRequest("check_user_login", "",	
                   function(response) {
                        if(response.loggedin) {			
	                       showPopupModal("Card-Info", body, footer, "300");
						 }
						 else {
                            showPopupModal("Not Logged In!", "You need to be logged in to enter card  info", "", "300");
                        }
    });

}


function enter_machine_info()
{
  
  
  //var m_name        = $('#machine_name').val();
   var mname       = $('#machine_name').val();
  var mIPaddr      = $('#mIPaddr').val();
  var osType       = $('#osType').val();
  var totalMemory  = $('#totalMemory').val();
  var totalCpus    = $('#totalCpus').val();
  var cpuType      = $('#cpuType').val();
	

  
    //sendAjaxRequest("enter_machine_info", "machine_name="+mname+"&m_ipaddr="+mIPaddr+"&osType="+osType+"&totalMemory="+totalMemory&"totalCpus="+totalCpus&"cpuType="+cpuType,
	 sendAjaxRequest("enter_machine_info", "machine_name="+mname+"&m_ipaddr="+mIPaddr+"&osType="+osType+"&totalMemory="+totalMemory+"&totalCpus="+totalCpus+"&cpuType="+cpuType,
					function(response) {
						// This only gets here if 'ok' was true inside phpjs.php's response
                        //alert(response.ok);
                        //loadAllTestBeds();
						updateMainContent("Machine Database updated");
                        //prependMainContent(getDismissibleAlert("Testbed updated"));
						//loadIPMIPage();
					});

hidePopupModal();
}


function enter_card_info()
{
  
  
  var mname           = $('#machine_name').val();
  var card_serial     = $('#card_serial').val();
  var card_type       = $('#card_type').val();
  
	
  //alert(ipmi_user_id);

  
    sendAjaxRequest("enter_card_info", "machine_name="+mname+"&card_serial="+card_serial+"&card_type="+card_type,
					function(response) {
						// This only gets here if 'ok' was true inside phpjs.php's response
                        
						updateMainContent("IPMI Database updated");
                        
					});
hidePopupModal();
}


function enter_rpb_info()
{
  
  
  var rpb                = $('#rpb').val();
  var username           = $('#username').val();
  var password           = $('#password').val();
  
  
 //var query = 'insert into Rpb values ("rpb",")';
  
  //nsert into Rpb values("pswer","admn","adfd");
  var query = 'insert into Rpb values("' +  rpb + '"' + "," + '"' + username + '"' + "," + '"' + password + '"' + ')';
  
  //alert(query);
  
  
						
   var postVars = "query=" + query;
   sendAjaxRequest("run_single_db_query", postVars,
 
					function(response) {
						// This only gets here if 'ok' was true inside phpjs.php's response
                                                alert(response);
						updateMainContent("Rpb Database updated");
						
                        
					});
hidePopupModal();
}

function update_ipmi_info()
{
  var mname        = $('#machine_addr').val();
  var m_ipmi       = $('#machine_ipmi').val();
  var ipmi_user_id = $('#ipmi_user_id').val();
  var ipmi_passwd  = $('#ipmi_passwd').val();
	
    sendAjaxRequest("update_ipmi_info", "machine_name="+mname+"&m_ipmi="+m_ipmi+"&ipmi_user_id="+ipmi_user_id+"&ipmi_passwd="+ipmi_passwd,
					function(response) {
						
						updateMainContent("IPMI Database updated");
                       
					});
hidePopupModal();
}

function loadMainPage() 
{
    var username = $('#loginUsername').val();
    if (username = " ") {
      alert("Hello");
    } else {
		loadAllTestBeds();
    }
}


function covertArrayToInteger(array) {

lat3 = [];

for(var i=0; i<array.length; i++)
  {

   var s = array[i];
   var number = parseInt(s);

   lat3.push(number);

  }

  return lat3;
}

function plotGraph(cat1,iops1,mbps1,lat1,tag1,cat2,iops2,mbps2,lat2,tag2,blockSize,testType,writePercentage)

{

var h1 = tag1[1];
var h2 = tag2[2];

var tiops1 = 'IOPS ' + h1;
var tiops2 = 'IOPS ' + h2;

var tbw1 = 'BandWidth ' + h1;
var tbw2 = 'BandWidth ' + h2;

var tlat1 = 'Latency ' + h1;
var tlat2 = 'Latency ' + h2;


iops1 = covertArrayToInteger(iops1);
mbps1 = covertArrayToInteger(mbps1);
lat1 = covertArrayToInteger(lat1);
tag1 = covertArrayToInteger(tag1);
cat1 = covertArrayToInteger(cat1);

iops2 = covertArrayToInteger(iops2);
mbps2 = covertArrayToInteger(mbps2);
lat2 = covertArrayToInteger(lat2);
tag2 = covertArrayToInteger(tag2);

//$("#mainContentSiteDivTopMsg").html("hello");
//prependMainContent("hello");

var html = "<div style=\"overflow: auto; width:1200px; height:600px; float:left; background:#00CC33;\" id='container1' ></div>";
updateMainContent(html);
 
//var html = getPerformanceFormHtml();
//updateSideBar(html) ;


var chart = new Highcharts.Chart({
  chart: {
     //renderTo: 'mainContentSiteDiv',
	 renderTo: 'container1',
	 
     zoomType: 'xy'
  },
  title: {
     //text: 'Bandwidth IOPS and Latency for for bs=16384 , Write%=50 , Test=SUST8K '
	 text: 'Bandwidth IOPS and Latency ' + h1 + ' vs ' + h2 +' for bs=' + blockSize + ', Write%=' + writePercentage + ', Test=' + testType
  },
  subtitle: {
     text: 'Source: Systems QA Performance DATA'
  },
  xAxis: [{
     labels: {
        formatter: function() {
           return this.value+' Trd';
        },
        style: {
           color: '#4572A7'
        }
     },

     categories: cat1 
  }],
  yAxis: [{ // Primary yAxis
     labels: {
        formatter: function() {
           return this.value+' IOPS';
        },
        style: {
           color: '#4572A7'
        }
     },
     title: {
        text: 'IOPS',
        style: {
           color: '#4572A7'
        }
     },
     opposite: true

  }, { // Secondary yAxis
     gridLineWidth: 0,
     title: {
        text: 'Latency',
        style: {
           color: '#4572A7'
        }
     },
     labels: {
        formatter: function() {
           return this.value+' µs';
        },
        style: {
           color: '#4572A7'
        }
     }

  }, { // Tertiary yAxis
     gridLineWidth: 0,
     title: {
        text: 'Bandwidth',
        style: {
           color: '#4572A7'
        }
     },
     labels: {
        formatter: function() {
            return this.value+' MB/s';
        },
        style: {
           color: '#4572A7'
        }
     },
     opposite: true
  }],

  tooltip: {
                formatter: function() {
                    var unit = {
                         tiops1 : ' IOPS',
                         tlat1 : ' µs',
                         tbw1 : ' MB/s',
                         tiops2 : ' IOPS',
                         tlat2 : ' µs',
                         tbw2 : ' MB/s'

                    }[this.series.name];

                    return ''+
                        this.x +': '+ this.y +' '+unit;
                }
            },
  legend: {
     layout: 'vertical',
     align: 'left',
     x: 120,
     verticalAlign: 'top',
     y: 80,
     floating: true,
     backgroundColor: '#FFFFFF'
  },
  series: [{
     name: tlat1,
     color: '#89A54E',
     type: 'column',
     yAxis: 1,
     //data: [ 297.62,394.98,539.06,659.75,758.86,947.56,1102.82,1713.03,2901.17,11132.06 ]
	 data: lat1


  },
 {
     name: tlat2,
     color: '#AA4643',
     type: 'column',
     yAxis: 1,
     //data: [ 297.62,394.98,539.06,659.75,758.86,947.56,1102.82,1713.03,2901.17,11132.06]
	 data: lat2


  },

    {
     name: tbw1,
     type: 'spline',
     color: '#89A54E',
     yAxis: 2,
     //data: [109,164,241,296,344,413,473,610,721,752],
	 data: mbps1,
     marker: {
        enabled: false
     },
     dashStyle: 'shortdot'

  },{
     name: tbw2,
     type: 'spline',
     color: '#AA4643',
     yAxis: 2,
     //data: [ 109,164,241,296,344,413,473,610,721,752],
	 data: mbps2,
     marker: {
        enabled: false
     },
     dashStyle: 'shortdot'

  },

  {
     name: tiops1,
     color: '#89A54E',
     type: 'spline',
     //data: [6653,10048,14743,18092,21010,25239,28910,37273,44053,45952 ]
	 data: iops1
  },
{
     name: tiops2,
     color: '#AA4643',
     type: 'spline',
     //data: [6653,10048,14743,18092,21010,25239,28910,37273,44053,45952]
	 data: iops2
  }

]
});

}


function plotGraph3()

{



//$("#mainContentSiteDivTopMsg").html("hello");
//prependMainContent("hello");

var html = "<div style=\"overflow: auto; width:1200px; height:600px; float:left; background:#00CC33;\" id='container1' ></div>";
updateMainContent(html);
 
//var html = getPerformanceFormHtml();
//updateSideBar(html) ;


var chart = new Highcharts.Chart({
  chart: {
     //renderTo: 'mainContentSiteDiv',
	 renderTo: 'container1',
	 
     zoomType: 'xy'
  },
  title: {
     text: 'Bandwidth IOPS and Latency for for bs=16384 , Write%=50 , Test=SUST8K '
	 //text: 'Bandwidth IOPS and Latency ' + h1 + ' vs ' + h2 +' for bs=' + blockSize + ', Write%=' + writePercentage + ', Test=' + testType
  },
  subtitle: {
     text: 'Source: Systems QA Performance DATA'
  },
  xAxis: [{
     labels: {
        formatter: function() {
           return this.value+' Trd';
        },
        style: {
           color: '#4572A7'
        }
     },

     categories: [ 1,2]
  }],
  yAxis: [{ // Primary yAxis
     labels: {
        formatter: function() {
           return this.value+' IOPS';
        },
        style: {
           color: '#4572A7'
        }
     },
     title: {
        text: 'IOPS',
        style: {
           color: '#4572A7'
        }
     },
     opposite: true

  }, { // Secondary yAxis
     gridLineWidth: 0,
     title: {
        text: 'Latency',
        style: {
           color: '#4572A7'
        }
     },
     labels: {
        formatter: function() {
           return this.value+' µs';
        },
        style: {
           color: '#4572A7'
        }
     }

  }, { // Tertiary yAxis
     gridLineWidth: 0,
     title: {
        text: 'Bandwidth',
        style: {
           color: '#4572A7'
        }
     },
     labels: {
        formatter: function() {
            return this.value+' MB/s';
        },
        style: {
           color: '#4572A7'
        }
     },
     opposite: true
  }],

  tooltip: {
                formatter: function() {
                    var unit = {
                         tiops1 : ' IOPS',
                         tlat1 : ' µs',
                         tbw1 : ' MB/s',
                         tiops2 : ' IOPS',
                         tlat2 : ' µs',
                         tbw2 : ' MB/s'

                    }[this.series.name];

                    return ''+
                        this.x +': '+ this.y +' '+unit;
                }
            },
  legend: {
     layout: 'vertical',
     align: 'left',
     x: 120,
     verticalAlign: 'top',
     y: 80,
     floating: true,
     backgroundColor: '#FFFFFF'
  },
  series: [{
     name: tlat1,
     color: '#89A54E',
     type: 'column',
     yAxis: 1,
     data: [ 297.62,394.98,539.06,659.75,758.86,947.56,1102.82,1713.03,2901.17,11132.06 ]
	 //data: lat1


  },
 {
     name: tlat2,
     color: '#AA4643',
     type: 'column',
     yAxis: 1,
     data: [ 297.62,394.98,539.06,659.75,758.86,947.56,1102.82,1713.03,2901.17,11132.06]
	 //data: lat2


  },

    {
     name: tbw1,
     type: 'spline',
     color: '#89A54E',
     yAxis: 2,
     data: [109,164,241,296,344,413,473,610,721,752],
	 //data: mbps1,
     marker: {
        enabled: false
     },
     dashStyle: 'shortdot'

  },{
     name: tbw2,
     type: 'spline',
     color: '#AA4643',
     yAxis: 2,
     data: [ 109,164,241,296,344,413,473,610,721,752],
	 //data: mbps2,
     marker: {
        enabled: false
     },
     dashStyle: 'shortdot'

  },

  {
     name: tiops1,
     color: '#89A54E',
     type: 'spline',
     data: [6653,10048,14743,18092,21010,25239,28910,37273,44053,45952 ]
	 //data: iops1
  },
{
     name: tiops2,
     color: '#AA4643',
     type: 'spline',
     data: [6653,10048,14743,18092,21010,25239,28910,37273,44053,45952]
	 //data: iops2
  }

]
});

}



function plotGraph2()

{


//$("#mainContentSiteDivTopMsg").html("hello");
//prependMainContent("hello");

var html = "<div style=\"overflow: auto; width:1200px; height:600px; float:left; background:#00CC33;\" id='container1' ></div>";
updateMainContent(html);
 
//var html = getPerformanceFormHtml();
//updateSideBar(html) ;


var chart = new Highcharts.Chart({
  chart: {
     //renderTo: 'mainContentSiteDiv',
	 renderTo: 'container1',
	 
     zoomType: 'xy'
  },
  title: {
     //text: 'Bandwidth IOPS and Latency for for bs=16384 , Write%=50 , Test=SUST8K '
	 text: 'Hello'
  },
  subtitle: {
     text: 'Source: Systems QA Performance DATA'
  },
  xAxis: [{
     labels: {
        formatter: function() {
           return this.value+' Trd';
        },
        style: {
           color: '#4572A7'
        }
     },

     categories: cat1 
  }],
  yAxis: [{ // Primary yAxis
     labels: {
        formatter: function() {
           return this.value+' IOPS';
        },
        style: {
           color: '#4572A7'
        }
     },
     title: {
        text: 'IOPS',
        style: {
           color: '#4572A7'
        }
     },
     opposite: true

  }, { // Secondary yAxis
     gridLineWidth: 0,
     title: {
        text: 'Latency',
        style: {
           color: '#4572A7'
        }
     },
     labels: {
        formatter: function() {
           return this.value+' µs';
        },
        style: {
           color: '#4572A7'
        }
     }

  }, { // Tertiary yAxis
     gridLineWidth: 0,
     title: {
        text: 'Bandwidth',
        style: {
           color: '#4572A7'
        }
     },
     labels: {
        formatter: function() {
            return this.value+' MB/s';
        },
        style: {
           color: '#4572A7'
        }
     },
     opposite: true
  }],

  tooltip: {
                formatter: function() {
                    var unit = {
                         tiops1 : ' IOPS',
                         tlat1 : ' µs',
                         tbw1 : ' MB/s',
                         tiops2 : ' IOPS',
                         tlat2 : ' µs',
                         tbw2 : ' MB/s'

                    }[this.series.name];

                    return ''+
                        this.x +': '+ this.y +' '+unit;
                }
            },
  legend: {
     layout: 'vertical',
     align: 'left',
     x: 120,
     verticalAlign: 'top',
     y: 80,
     floating: true,
     backgroundColor: '#FFFFFF'
  },
  series: [{
     name: tlat1,
     color: '#89A54E',
     type: 'column',
     yAxis: 1,
     //data: [ 297.62,394.98,539.06,659.75,758.86,947.56,1102.82,1713.03,2901.17,11132.06 ]
	 data: lat1


  },
 {
     name: tlat2,
     color: '#AA4643',
     type: 'column',
     yAxis: 1,
     //data: [ 297.62,394.98,539.06,659.75,758.86,947.56,1102.82,1713.03,2901.17,11132.06]
	 data: lat2


  },

    {
     name: tbw1,
     type: 'spline',
     color: '#89A54E',
     yAxis: 2,
     //data: [109,164,241,296,344,413,473,610,721,752],
	 data: mbps1,
     marker: {
        enabled: false
     },
     dashStyle: 'shortdot'

  },{
     name: tbw2,
     type: 'spline',
     color: '#AA4643',
     yAxis: 2,
     //data: [ 109,164,241,296,344,413,473,610,721,752],
	 data: mbps2,
     marker: {
        enabled: false
     },
     dashStyle: 'shortdot'

  },

  {
     name: tiops1,
     color: '#89A54E',
     type: 'spline',
     //data: [6653,10048,14743,18092,21010,25239,28910,37273,44053,45952 ]
	 data: iops1
  },
{
     name: tiops2,
     color: '#AA4643',
     type: 'spline',
     //data: [6653,10048,14743,18092,21010,25239,28910,37273,44053,45952]
	 data: iops2
  }

]
});

}


function get_test_type_str(testType) 

{

  if (testType == "peak") {
     return "PEAK";
  }
  else if (testType == "sustained") {
     return "SUST8K";
  
  }

}

function get_test_type_str_rev(testType) 

{

  if (testType == "PEAK") {
     return "peak";
  }
  else if (testType == "SUST8K") {
     return "sustained";
  
  }

}

function getPerformancePage(wrpct,bs,testType) 
{

var build1             = $('#build1').val();

var cardType1          = $('#cardType1').val();
var mode1              = $('#mode1').val();
var plat_tag1          = $('#plat_tag1').val();
var testType1          = $('#testType1').val();
var blockSize1         = $('#blockSize1').val();
//alert(blockSize1);


var writePercentage1   = $('#writePercentage1').val();

var build2             = $('#build2').val();
var cardType2          = $('#cardType2').val();
var mode2              = $('#mode2').val();
var plat_tag2          = $('#plat_tag2').val();
var testType2          = $('#testType2').val();
var blockSize2         = $('#blockSize2').val();
var writePercentage2   = $('#writePercentage2').val();

//alert(bs);
if ( wrpct != undefined) {
 writePercentage1 = wrpct;
 writePercentage2 = wrpct;

}

if ( bs != undefined) {
 blockSize1 = bs;
 blockSize2 = bs;
 //writePercentage2 = wrpct;

}
//alert(testType);
if ( testType != undefined) {
testType2 = get_test_type_str_rev(testType);
testType1 = get_test_type_str_rev(testType);


}


//alert(cardType1);
//alert(cardType2);


var values = 	"blockSize1="+blockSize1+"&testType1="+get_test_type_str(testType1)+"&writePercentage1="+writePercentage1+"&mode1="+mode1+"&build1="+build1+"&plat_tag1="+plat_tag1+"&cardType1="+cardType1;
   values += 	"&blockSize2="+blockSize2+"&testType2="+get_test_type_str(testType2)+"&writePercentage2="+writePercentage2+"&mode2="+mode2+"&build2="+build2+"&plat_tag2="+plat_tag2+"&cardType2="+cardType2;
   
   

var comp1 =  "build1= " + build1 + " card=" + cardType1 + " mode1=" + mode1 + " plat1=" + plat_tag1 + " testType1=" + testType1 + " bs1=" + blockSize1 + " wpct1=" + writePercentage1;

var comp2 =  "build2= " + build2 + " card=" + cardType2 + " mode2=" + mode2 + " plat2=" + plat_tag2 + " testType2=" + testType2 + " bs2=" + blockSize2 + " wpct2=" + writePercentage2;

compare_html = '<p class="text-info"><strong>Comparing Performance:</strong> <br>' + '<i>' + comp1 + '</i>' +  ' <br> ' +  '<i>' + comp2 + '</i>'  + '</p>';

sendAjaxRequest("get_perf_data", values,
					function(response) {
					
					
                        //prepend
                        $("#mainContentSiteDivTopMsg").html(compare_html);
					    
						//alert(data1);
					    data1 = response.data.data1;
						data2 = response.data.data2;

                        // DATA 1
						
						var cat1 = [];
						var iops1 = [];
						var mbps1 = [];
						var lat1 = [];
						var tag1 = [];
                        
						
						for(var i=0; i<data1.length; i++)
						{
						  cat1.push(data1[i].test_jobs);
						  iops1.push(data1[i].test_iops);
						  mbps1.push(data1[i].test_bw);
						  lat1.push(data1[i].lat_sum);
						  tag1.push(data1[i].test_tag);

						}
						
						// DATA 2
						var cat2 = [];
						var iops2 = [];
						var mbps2 =[];
						var lat2 = [];
						var tag2 = [];

						
						for(var i=0; i<data2.length; i++)
						{
						  cat2.push(data2[i].test_jobs);
						  iops2.push(data2[i].test_iops);
						  mbps2.push(data2[i].test_bw);
						  lat2.push(data2[i].lat_sum);
						  tag2.push(data2[i].test_tag);

						}

						var h1 = tag1[1];
						var h2 = tag2[2];
						

//alert(iops1);	


				
   plotGraph(cat1,iops1,mbps1,lat1,tag1,cat2,iops2,mbps2,lat2,tag2,blockSize1,testType1,writePercentage1);

	}); 
	
	
}

function loadPerformancePage() 
{

var html = getPerformanceFormHtml();
//updateMainContent(html); 
updateSideBar(html); 
}



function dropDown(values,id)
{
 var html = "";
modes = values;

//alert(modes);
  //Blk size1
  html += '<select  class="span2"  name=' + id + ' id=' + id +'>';
  idClass = '#' + id;
  var vtxt = $(this).attr('id');

  //alert(idClass);
  for(var i=0; i< modes.length; i++) {
       mode = modes[i];
	   if ($('#'+id).val() == mode) {
	      //alert($('#'+id).val());
          html += '<option selected="selected" value=' + mode +'>' + mode + '</option>';
	   } else {
	      html += '<option  value=' + mode +'>' + mode + '</option>';
	   
	   }
       
  }
  html += '</select>'; 
  //alert(html);
  return html;

}

 function getPerformanceFormHtml() 
{


  var html = "";
 
  //html += '<div class="container" >';
  //html += '<div class="controls">';
  
  html += '<form onsubmit="return false;">';    
  
  
  // Build Type
  html += '<br>';
  html += '<b><i>Build Details: </i></b>';
  
  html += '<select  class="span2"  name="build1" id="build1">';
  html += '<option value="48316.C5">48316.C5</option>';
  html += '</select>'; 
  
  html += '<select  class="span2"  name="build2" id="build2">';
  html += '<option value="48316.C5">48316.C5</option>';
  html += '</select>'; 
  
  // Card Type
  
  
  html += '<br>';
  cardTypes = ["2200","550"];
  
  html += '<b><i>Card Type: </i></b>';
  html += dropDown(cardTypes,"cardType1");
  html += dropDown(cardTypes,"cardType2");
  
  
  // Card Type
  html += '<br>';
  html += '<b><i>Mode Type: </i></b>';
  
  
  modes = ["maxcapacity","maxperformance"];
  html += dropDown(modes,"mode1");
  html += dropDown(modes,"mode2");
  
 
       
  
  // Tag Type
  html += '<br>';
  html += '<b><i>Platform Type: </i></b>';
  
  platTypes = [ "EP-RHEL62","EX-RHEL62","AMD-RHEL63", "E5-RHEL63","EP-FAST-SLESSP2","E5-RHEL63-IODRIVE" ];
  html += dropDown(platTypes,"plat_tag1");
  html += dropDown(platTypes,"plat_tag2");
  
  

  
  // Test Type
  html += '<br>';
  html += '<b><i> Test Type: </i></b>';
  
  testType = ["peak","sustained"];
  
  html += dropDown(testType,"testType1");
  html += dropDown(testType,"testType2");
  
 
  
  //Block size
  html += '<br>';
  
  
  
  html += '<b><i>Block Size: </i></b>';
  
  blocksizes = ["4096","8192","16384"];
  html += dropDown(blocksizes,"blockSize1");
  html += dropDown(blocksizes,"blockSize2");
 

  //Write Perc
  html += '<br>';
  html += '<b><i> Write Percentage: </i></b>';
  writePercentages = [ "0", "10" , "25", "50", "75","90", "100"];
  html += dropDown(writePercentages,"writePercentage1");
  html += dropDown(writePercentages,"writePercentage2");
  
  
  
  html += '<br>';
  
   
  html += '<button type="submit" class="btn btn-primary btn-large" onclick=getPerformancePage()>Get Results!</button>';
  html += '<br> </br>';
  html += '<button type="submit" class="btn btn-primary btn-large" onclick=loadHeatMapPage()>Get Heatmap!</button>';
  html += '</form>';
   
 
  return html;
  
  }
  
  


function loadPerformancePage1() 
{

  var html = "";
  
  html += '<form class="form-horizontal">';
   
  html +=   '<div class="control-group">';
  html += '<label class="control-label" for="blockSize"> Block Size</label>';
  html += '<div class="controls">';

  html += '<select  class="span3"  name="blockSize">';
  html += '<option selected value="4K">4K</option>';
  html += '<option  value="8K">8K</option>';
  html += '<option value="16K">16K</option>';
  html += '<option value="32K">32K</option>';
  html += '<option value="64K">64K</option>';
  html += '<option value="128K">128K</option>';
 
  html += '</select>'; 
  html += '</div>';
  html += '</div>';
  
  
  // Another drop down block
  html +=   '<div class="control-group">';
  html += '<label class="control-label" for="testType"> Test Type</label>';
  html += '<div class="controls">';

  html += '<select  class="span3"  name="testType">';
  
  html += '<option value="peak">peak</option>';
  html += '<option value="sustained">sustained</option>';
  
  html += '</select>'; 
  html += '</div>';
  html += '</div>';
    
  
  
  // Another drop down block
  html +=   '<div class="control-group">';
  html += '<label class="control-label" for="writePercentage"> Write Percentage</label>';
  html += '<div class="controls">';

  html += '<select  class="span3"  name="writePercentage">';
  
  html += '<option value="10">10</option>';
  html += '<option value="20">20</option>';
  
  html += '</select>'; 
  html += '</div>';
  html += '</div>';
    
  
  html +=   '<div class="control-group">';
  
  html += '<div class="controls">';

   html += '<button type="submit" class="btn btn-primary" onclick=getPerformancePage()>Get Results!</button>';
  html += '</div>';
  html += '</div>';

   html += '</form>';
   
  updateMainContent(html);
   
}

function loadAllTestBeds()
{
	sendAjaxRequest("get_test_beds", "", 
					function(response) {
						var html = "";
						html += '<table id="machineTable" class="table table-striped">';
						html 	+= '<thead><tr><th>Name</th><th>User</th><th>Total Cpus</th><th>Cpu Details</th><th>OS Type</th><th>Memory</th><th>Card Details</th><th>Comments</th><th>Reserve</th></tr></thead>';
                        html    += '<tbody>';
                        
                        var totalMachines = 1
                        var currentUser = response.currentUser;
						for(var i=0; i<response.data.length; i++)
						{
							var mname = response.data[i].tb_name;
							if (mname == "dummy"){
							  continue;
							}
                            var username = response.data[i].user;
                            var totalCpus = response.data[i].cpus;
                            var cpuType = response.data[i].cpuType;
							var totalMemory = response.data[i].totalMemory;
							var comment = response.data[i].comment;
                    
							osType = response.data[i].osType;
							
							if (osType == null || osType == "") {
							   osType = "Click to edit..";
							 }
							
                            if(totalCpus == null || totalCpus == "") {
                              totalCpus = "N/A";
                            }
							
							if(cpuType == null || cpuType == "") {
                              cpuType = "N/A";
                            }
							
							if (totalMemory == null || totalMemory == "") {
							   totalMemory = "Click to edit..";
							 }
                            
							html += '<tr>';
							html 	+= '<td><a href="#" onClick="loadMachinePage(\'' + mname + '\')">' + mname + '</a></td>';

							html 	+= '<td>' + response.data[i].user + '</td>';
                            html 	+= '<td>' +  totalCpus + '</td>';
							html 	+= '<td>' +  cpuType + '</td>';
							
							html 	+= '<td onClick="javascript: updateOSTypeMachine(\'' + mname + '\')">' + '<div class="ostype" id="ostype"  >' + osType + '</div>' + '</td>';
							html 	+= '<td onClick="javascript: updateMemoryMachine(\'' + mname + '\')">' + '<div class="totalMemory" id="totalMemory"  >' + totalMemory + '</div>' + '</td>';
							html    += '<td>' + response.data[i].card_details + '</td>';
							
							if (comment == null || comment == "") {
							   comment = "Click to edit..";
							 }
							 
							 html 	+= '<td onClick="javascript: updateCommentMachine(\'' + mname + '\')">' + '<div class="comment" id="comment"  >' + comment + '</div>' + '</td>';
							 //html    += '<td>' + comment + '</td>';
                            
                            // if username is free then change button to reserve
                            if (username == "FREE") 
                            {
								html    += '<td> <button class="btn btn-small btn-primary" type="button"  onclick="attemptMachineReserve(\'' + mname + '\', \'' + username + '\')"><B>Reserve</B></button></td>';
                            } 
                            //else (currentUser != username) 
                            //{
							//   html    += '<td> <button class="btn btn-small btn-primary" type="button" disabled="disabled" onclick="attemptMachineReserve(\'' + mname + '\', \'' + username + '\')"><B>Reassign</B></button></td>';
							//} 
                            
                            else {
								html    += '<td> <button class="btn btn-small btn-primary" type="button"  onclick="attemptMachineReserve(\'' + mname + '\', \'' + username + '\')"><B>Reassign</B></button></td>';
                            }
                            html += '</tr>';
							totalMachines = totalMachines + 1;
						}
						html += '</tbody></table>';
						html += '<b>Total Machines: </b>' + totalMachines;
						updateMainContent(html);
						
						var options = {
							additionalFilterTriggers: [$('#quickfind')]
						};
						// TO DO Clear table filter
						// $("#quickfind").html('');
						// $("#quickfind").val('');
						$('#machineTable').tableFilter(options);
					});
}



function loadTestResultsPage()
{   


  var html = "";
 
  //html += '<div class="container" >';
  //html += '<div class="controls">';
  
  html += '<form onsubmit="return false;">';    

  // Tag Type
  html += '<br>';
  html += '<b><i>Platform Type: </i></b>';
  
  platTypes = [ "EP-RHEL62","EX-RHEL62","AMD-RHEL63", "E5-RHEL63","EP-FAST-SLESSP2","E5-RHEL63-IODRIVE1" ];
  html += dropDown(platTypes,"plat_tag1");
  html += dropDown(platTypes,"plat_tag2");

  // Test Type
  html += '<br>';
  html += '<b><i> Test Type: </i></b>';
  
  testType = ["peak","sustained"];
  
  html += dropDown(testType,"testType1");
  html += dropDown(testType,"testType2");
  
 
  
  //Block size
  html += '<br>';

  html += '<b><i>Block Size: </i></b>';
  
  blocksizes = ["4096","8192","16384"];
  html += dropDown(blocksizes,"blockSize1");
  html += dropDown(blocksizes,"blockSize2");
 

  //Write Perc
  html += '<br>';
  html += '<b><i> Write Percentage: </i></b>';
  writePercentages = [ "0", "10" , "25", "50", "75","90", "100"];
  html += dropDown(writePercentages,"writePercentage1");
  html += dropDown(writePercentages,"writePercentage2");

  html += '<br>';

  html += '<button type="submit" class="btn btn-primary btn-large" onclick=loadHeatMapPage()>Get Heatmap!</button>';
  html += '</form>';
  
  updateMainContent(html);
   

}

function get_test_results_headers_html() 

{

var html = "";
	//html += '<table id="testResults" class="table table-bordered">';
						//html 	+= '<thead><tr><th>testCase Description</th><th>Build</th><th>Machine</th><th>testType</th><th>Card Initial state </th><th>cardType</th><th>cardSerial</th><th>osVersion</th><th>hostKernel</th><th>total Cpus</th><th>Cpu Type</th><th>testcase Id</th><th>Reason Passed</th><th>Return Code</th><th>Time </th><th>Result</th><th>logFilePath</th></tr></thead>';
						
						html 	+= '<thead><tr><th>testCase Description</th><th>Build</th><th>Machine</th><th>Card Initial state </th><th>cardType</th><th>cardSerial</th><th>osVersion</th><th>hostKernel</th><th>total Cpus</th><th>Cpu Type</th><th>testcase Id</th><th>Reason Passed</th><th>Return Code</th><th>Time </th><th>Result</th><th>logFilePath</th></tr></thead>';
                        //html    += '<tbody>';
						
	return html;
						

}

function loadBuildTestResultsPage()

{

  //setInterval(function(){alert("Hello")},3000);
  var html = "";
 
  //html += '<div class="container" >';
  //html += '<div class="controls">';
  
  html += '<form onsubmit="return false;">';    

  // Tag Type
  html += '<br>';
  html += '<b><i>Build Type: </i></b>';
  
  builds = [ "49400.C5" ];
  html += dropDown(builds,"build");
  
  // Tag Type
  html += '<br>';
  html += '<b><i>Card Type: </i></b>';
  
  builds = [ "2.2TB","1.1TB","550GB" ];
  html += dropDown(builds,"cardType");
  
  // Tag Type
  //html += '<br>';
  //html += '<b><i>Test Type: </i></b>';
  
  //builds = [ "utils", "filesystems" ,"lvm" ];
  //html += dropDown(builds,"testType");
  
  // Tag Type
  html += '<br>';
  html += '<b><i>OS Type: </i></b>';
  
  builds = [ "redhat6", "sles11sp1",  "sles11sp2", "redhat5","ubuntu1004" ];
  html += dropDown(builds,"osType");
  
  
  
  html += '<br>';

  html += '<button type="submit" class="btn btn-primary btn-large" onclick=loadBuildTestResultsPage1()>Get Results!</button>';
  html += '</form>';
  
  updateSideBar(html);
  
  //setInterval(loadBuildTestResultsPage(),3000);
  
  //plotGraph1();

}

function get_testResults_table_html(data)
{

                        var html = "";
						html += '<table id="testResults" class="table table-bordered">';
						html 	+= '<thead><tr><th>No</th><th>testCase Description</th><th>Build</th><th>Machine<th>Card Initial state </th><th>cardType</th><th>cardSerial</th><th>osVersion</th><th>hostKernel</th><th>total Cpus</th><th>Cpu Type</th><th>testcase Id</th><th>Reason Passed</th><th>Return Code</th><th>Time </th><th>Result</th><th>logFilePath</th></tr></thead>';
						
						
                        html    += '<tbody>';

						for(var i=0; i<data.length; i++)
						{
						
						    
							var build = data[i].build;
							var machineName = data[i].machineName;
							var osVersion = data[i].osVersion;
							var totalCpus = data[i].totalCpus;
							var cpuType = data[i].cpuType;
							var testCaseid = data[i].testCaseId;
							var testCaseDescription = data[i].testCaseDescription;
							var testCaseReasonPassed = data[i].testCaseReasonPassed;
							var testCaseReturnCode = data[i].testCaseReturnCode;
							var result = data[i].result;
							var logFilePath = data[i].logFilePath;
							var cardInitialState = data[i].cardInitialState;
							var testType = data[i].testcaseStr;

							
							var hostKernel =data[i].hostKernel;
							var cardType = data[i].cardType;
							var cardSerial = data[i].cardSerial;
							var timeTaken  = data[i].testCaseTimeTaken;

							html += '<tr>';
                                                        
                            html 	+= '<td>' +  i + '</td>';
							
							html 	+= '<td><b>' +  testCaseDescription + '</b></td>';
							
                            html 	+= '<td>' +  build + '</td>';

							html 	+= '<td>' +  machineName + '</td>';
							//html 	+= '<td>' +  testType + '</td>';
							html 	+= '<td>' +  cardInitialState + '</td>';
							html 	+= '<td>' +  cardType + '</td>';
							html 	+= '<td>' +  cardSerial + '</td>';
							html 	+= '<td>' +  osVersion + '</td>';
							html 	+= '<td>' +  hostKernel + '</td>';
							html 	+= '<td>' +  totalCpus + '</td>';
							html 	+= '<td>' +  cpuType + '</td>';
							html 	+= '<td>' +  testCaseid + '</td>';
							
							html 	+= '<td>' +  testCaseReasonPassed + '</td>';
							html 	+= '<td>' +  testCaseReturnCode + '</td>';
							html 	+= '<td>' +  timeTaken + '</td>';
							html 	+= '<td>' +  result + '</td>';
							html 	+= '<td><a href=' +  logFilePath + '>' + "logFile" + '</a></td>';
							
							
                            html += '</tr>';
							
						}
						html += '</tbody></table>';
						
						return html;



}


function loadBuildTestResultsPage1()
{  
   
   var build            = $('#build').val();
   var testType         = $('#testType').val();
   var cardType         = $('#cardType').val();
   var osType           = $('#osType').val();

        
    //var html = "";
	sendAjaxRequest("get_test_results", "build=" + build + "&testType=" + testType + "&cardType=" + cardType + "&osType=" + osType , 
					   function(response) {
						                  var html = "";
                                                
                                             //hash is test Type data is comming response.data.utils , response.data.lvm
											 // hash['lvm'] whill have lvm data
                                            html += "<h1>Test Results Details for card " + cardType + " OSType " + osType + '</h1>';
                                            html += "<hr>"
                                            hash = response.data[cardType];
                                            var testCount1 = response.data[cardType]['utils'].length;
                                                                    
                                            //alert(testCount1);
                                                                    
											var testTypes = [];
											var testCount = [];
                                            for(var index in hash) {
											      testTypes.push(index);
												  
												  testCount.push(hash[index].length);
                                                  html += '<h2>' + index + '</h2>';
												  
												  // index is utils ass examples
                                                  array = hash[index];
                                                  
												  // array is response.data.utils as example
                                                  html += get_testResults_table_html(array);
                                                  
                                                 
                                             }
                                             
                                               
					
					updateMainContent(html);
					
					
                    //plotGraph1(testTypes,testCount,osType);	

                     plotGraph1(response);	                    
						
					});
					
					//html += '<div id="hello">Hello</div>';
   //setInterval(loadBuildTestResultsPage1(),3000);                
                                                                
}


function plotGraph1(response)
{

 
     var seriesArray = [];
     
	 
     for(var cardType in response.data) {
	   var seriesDict = {};
	   
	   var testCountArray = [];
	   
	   var testTypeCardType = "";
	   for(var testType in response.data[cardType]) {
	       
	         testCountArray.push(response.data[cardType][testType].length);
			 
			 
	   }
	   
	   
           seriesDict['name'] =  cardType;
	   seriesDict['data'] =  testCountArray;
	   
	   seriesArray.push(seriesDict);
	
	 }
	 
	 //alert(seriesDict['data']);
 
      //dict = {name: 'redhat6',data: [2, 1, 4]};
      var chart1 = new Highcharts.Chart({
         chart: { renderTo: 'mainContentSiteDivTopMsg',defaultSeriesType: 'bar'},
         title: {text: 'Test Results summary for all cards for OS ' + response.osType},
         xAxis: {categories: response.testTypes},
         yAxis: {title: {text: 'No. of Test Cases ran/passed'}},
         //series: [{name: 'redhat6',data: [2, 1, 4]}, {name: 'redhat5',data: [5, 7, 3]}]
		 //series: [{name: osType,data: testCount}]
		 
		 series: seriesArray
      });

}




function updateMachineCard(serial) {
	$('.edit1').editable(function(value, settings) { 
                        var mname = value;
						var postVars = "machine_name=" + mname + "&card_serial=" + serial;
                        sendAjaxRequest("update_card_machine", postVars, 
                        function(response) {
                            updateMainContent("Database updated");
							loadAllCards();
                        });
                           //return(value);
                         }, { 
                          type    : 'textarea',
                          submit  : 'OK',
						  cancel    : 'Cancel',
						  tooltip : 'Click to edit...'
                        });
}

function updateCommentMachine(mname) {
	$('.comment').editable(function(value, settings) { 
                        var comment = value;
						
						var postVars = "machine_name=" + mname + "&comment=" + comment;
                        sendAjaxRequest("update_machine_comments", postVars, 
                        function(response) {
						    
                            updateMainContent("Database updated");
							loadAllTestBeds();
                        });
						  return comment;
                           //return(value);
                         }, { 
                          type    : 'textarea',
                          submit  : 'OK',
						  cancel    : 'Cancel',
						  
                        });
			
}

function updateMemoryMachine(mname) {
	$('.totalMemory').editable(function(value, settings) { 
                        var totalMemory = value;
						var query = 'update tb set totalMemory="' + totalMemory + '"' +  ' where tb_name="' + mname + '"';
						
						var postVars = "query=" + query;
                        sendAjaxRequest("run_single_db_query", postVars, 
                        function(response) {
                            updateMainContent("Database updated");
							loadAllTestBeds();
                        });
						  return totalMemory;
                         
                         }, { 
                          type   : 'textarea',
						  submit  : 'OK',
						  cancel    : 'Cancel',
                        });
			
}


function updateOSTypeMachine(mname) {
	$('.ostype').editable(function(value, settings) { 
                        var osType = value;
						var query = 'update tb set osType="' + osType + '"' +  ' where tb_name="' + mname + '"';
						
						//var postVars = "machine_name=" + mname + "&osType=" + osType;
						var postVars = "query=" + query;
                        sendAjaxRequest("run_single_db_query", postVars, 
                        function(response) {
						    
                            updateMainContent("Database updated");
							loadAllTestBeds();
                        });
						  return comment;
                           //return(value);
                         }, { 
						 data   : " {'Linux':'Linux','Windows':'Windows','ESXi':'ESXi'}",
                          type   : 'select',
                          //type    : 'textarea',
                          submit  : 'OK',
						  cancel    : 'Cancel',
						  
                        });
}
                             

function loadAllCards()
{   
	sendAjaxRequest("get_cards", "", 
					function(response) {
						var html = "";
						html += '<table id="cardTable" class="table table-striped">';
						html 	+= '<thead><tr><th>Card Serial</th><th>Type</th><th>Machine</th><th>Machine User</th></tr></thead>';
                        html    += '<tbody>';
                        
                        var currentUser = response.currentUser;
						for(var i=0; i<response.data.length; i++)
						{
							var mname = response.data[i].tb_name;
							var serial = response.data[i].serial;
							var cardDescription = response.data[i].cardDescription;
							var user = response.data[i].user;

							html += '<tr>';
							html 	+= '<td><a href="#" onClick="loadCardPage(\'' + serial + '\')">' +  serial + '</a></td>';
							html 	+= '<td>' + cardDescription + '</td>';
                            
							//html 	+= '<td>' + mname + '</td>';
							html 	+= '<td onClick="javascript: updateMachineCard(\'' + serial + '\')">' + '<div class="edit1" id="edit1"  >' + mname + '</div>' + '</td>';
							html 	+= '<td>' + user + '</td>';
                           
                            
                           html += '</tr>';
						}
						html += '</tbody></table>';
						updateMainContent(html);
						
						var options = {
							additionalFilterTriggers: [$('#quickfind')]
						};
						$('#cardTable').tableFilter(options);
						//$('#machineTable').tableFilter(options);
					});
}


function attemptMachineReserve(mname, username)
{
    hidePopupModal();
   
    sendAjaxRequest("check_user_login", "",
                    function(response) {
                        if(response.loggedin) {
                        	var body = "You are reserving: " + mname + "<br/> from: " + username + " to you";
                            var footer = '<button class="btn btn-success" onClick="javascript: executeReserveFor(\'' + mname + '\', \'' + username + '\')" name="submit"><i class="icon-user icon-white"></i>&nbsp;<b>Reserve!</b></button>\
                                            <button class="btn btn-success" onClick="javascript: freeMachine(\'' + mname + '\', \'' + username + '\')" name="submit"><i class="icon-trash icon-white"></i>&nbsp;<B>Release</b></button>\
                                            <button class="btn btn-warning" onClick="javascript: hidePopupModal()" name="submit"><i class="icon-remove icon-white"></i>&nbsp;<B>Cancel</b></button>';
                            
                            // if free remove freeMachine function
                            if (username == "FREE")   {
								var footer = '<button class="btn btn-success" onClick="javascript: executeReserveFor(\'' + mname + '\', \'' + username + '\')" name="submit"><i class="icon-user icon-white"></i>&nbsp;<b>Reserve!</b></button>\
                                           <button class="btn btn-warning" onClick="javascript: hidePopupModal()" name="submit"><i class="icon-remove icon-white"></i>&nbsp;<B>Cancel</b></button>';
                            }                            
                            showPopupModal("Reservation Confirmation", body, footer, "400");
                        }
                        else {
                            showPopupModal("Not Logged In!", "You need to be logged in to reserve a machine", "", "300");
                        }
                    });
}

function freeMachine(mname, fromUser) {
 	hidePopupModal();
    
    sendAjaxRequest("free_machine", "machine_name="+mname+"&from_user="+fromUser,
					function(response) {
						// This only gets here if 'ok' was true inside phpjs.php's response
                        //alert(response.ok);
                        loadAllTestBeds();
                        prependMainContent(getDismissibleAlert("Release Finished", mname + " has been freed", "info"));
					});
}

function executeReserveFor(mname, fromUser)
{
	hidePopupModal();
    
	sendAjaxRequest("reserve_machine", "machine_name="+mname+"&from_user="+fromUser,
					function(response) {
						// This only gets here if 'ok' was true inside phpjs.php's response
                        loadAllTestBeds();
                        prependMainContent(getDismissibleAlert("Reserve Finished", mname + " has been reserved", "info"));
					});
}

function getVariableNullValue(variable) {
    if (variable == null) {
	    return "N/A";
	}
	return variable

}


function loadHeatMapPage() 
{


var build1             = $('#build1').val();

var cardType1          = $('#cardType1').val();
var mode1              = $('#mode1').val();
var plat_tag1          = $('#plat_tag1').val();
var testType1          = $('#testType1').val();
var blockSize1         = $('#blockSize1').val();
//alert(blockSize1);
var writePercentage1   = $('#writePercentage1').val();

var build2             = $('#build2').val();
var cardType2          = $('#cardType2').val();
var mode2              = $('#mode2').val();
var plat_tag2          = $('#plat_tag2').val();
var testType2          = $('#testType2').val();
var blockSize2         = $('#blockSize2').val();
var writePercentage2   = $('#writePercentage2').val();



var values = 	"blockSize1="+blockSize1+"&testType1="+get_test_type_str(testType1)+"&writePercentage1="+writePercentage1+"&mode1="+mode1+"&build1="+build1+"&plat_tag1="+plat_tag1+"&cardType1="+cardType1;
   values += 	"&blockSize2="+blockSize2+"&testType2="+get_test_type_str(testType2)+"&writePercentage2="+writePercentage2+"&mode2="+mode2+"&build2="+build2+"&plat_tag2="+plat_tag2+"&cardType2="+cardType2;
   
   

var comp1 =  "build1= " + build1 + " card=" + cardType1 + " mode1=" + mode1 + " plat1=" + plat_tag1 + " testType1=" + testType1 + " bs1=" + blockSize1 + " wpct1=" + writePercentage1;

var comp2 =  "build2= " + build2 + " card=" + cardType2 + " mode2=" + mode2 + " plat2=" + plat_tag2 + " testType2=" + testType2 + " bs2=" + blockSize2 + " wpct2=" + writePercentage2;

compare_html = '<p class="text-info"><strong>Comparing Heat Map:</strong> <br>' + '<i>' + comp1 + '</i>' +  ' <br> ' +  '<i>' + comp2 + '</i>'  + '</p>';


sendAjaxRequest("get_heat_map", values, 
					function(response) {
					    $("#mainContentSiteDivTopMsg").html(compare_html);
					    data1 = response.data.data1;
                                    
						
				        data2 = response.data.data2;

						var html = "";
                                                thtype =['PEAK','SUST8K']
                                                whbs = [4096,8192,16384]

                        for (var m = 0;m<thtype.length;m++)
                        {
                             for ( var k = 0;k<whbs.length;k++ )
                                    {
                                        html += '<h1>' +  whbs[k] + "," + thtype[m] + '</h1>'
                          			html += '<table id="ktable1" cellspacing="0" class="table-bordered">';
									
						//html 	+= '<tr><th>Jobs/Write%</th><th>0</th><th>10</th><th>25</th><th>50</th><th>75</th><th>90</th><th>100</th></tr>';
						
						html 	+= '<tr><th>Jobs/Write%</th>';
						whpct = [0,10,25,50,75,90,100];
						for( var i = 0;i<whpct.length;i++ ) {
						    html += '<th><a href="#" onClick="onclick=getPerformancePage(\'' + whpct[i] + '\',\'' + whbs[k] + '\',\'' + thtype[m] + '\')">' + whpct[i] + '</a></th>';
						    //html 	+= '<th>' +  whpct[i] + '</th>';
						    
						
						}
						html 	+= '</tr>';
                        
                        var currentUser = response.currentUser;
						
						
			      			thjobs = [1,2,4,6,8,12,16,32,64,256];

						for( var i = 0;i<thjobs.length;i++ )
						{  
                                                     
						      html += '<tr>';
                              html += '<th>' + thjobs[i] + '</th>';
							  //html 	+= '<td><a href="#" onClick="loadMachinePage(\'' + mname + '\')">' + mname + '</a></td>';
						  for( var j = 0;j<whpct.length;j++ )
						  {
							//test_iops = data1.4096.0;

 
							
							var value1 = data1[thtype[m]][whbs[k]][whpct[j]][thjobs[i]];
							var value2 = data2[thtype[m]][whbs[k]][whpct[j]][thjobs[i]];
							var value3 = value2/value1;
                                                        //html += '<td>' +  ((data1[thtype[m]][whbs[k]][whpct[j]][thjobs[i]]/data2[thtype[m]][whbs[k]][whpct[j]][thjobs[i]])*100).toFixed(0) + "%" + '</td>';
						    value3 = (value3*100).toFixed(0);
							
							color="yellow";
							if (value3 >= 100) {
							   color="green";
							}
							else if (value3 < 80) {
							   color="red";
							}
							
						    html += '<td bgcolor=' + color + '>' + value3  + "%" + '</td>';
						  }	
						
                                                        html += '</tr>';
                                                }
						
						html += '</table>'
						}
}
                            updateMainContent(html);
	
					});
 
}




function loadIPMIPage() 
{

sendAjaxRequest("get_ipmi_info", "", 
					function(response) {
						var html = "";
						html += '<table id="ipmiTable" class="table table-striped">';
						html 	+= '<thead><tr><th>Machine Name</th><th>IPMI addr</th><th>User id</th><th> passwd</th></tr></thead>';
                        html    += '<tbody>';
                        
						for(var i=0; i<response.data.length; i++)
						{
						
						  var  ipmi_addr = response.data[i].ipmi_addr;
						  var  ipmi_userid = response.data[i].ipmi_userid;
						  var  ipmi_passwd = response.data[i].ipmi_passwd;
                      
                            html += '<tr>';
						
							html 	+= '<td>' + response.data[i].tb_name + '</td>';
							html 	+= '<td>' + getVariableNullValue(ipmi_addr) + '</td>';
							html 	+= '<td>' + ipmi_userid + '</td>';
							html 	+= '<td>' + ipmi_passwd + '</td>';
							//html 	+= '<td>' +  cpuStr + '</td>';
								

                        html += '</tr>';    
  
						}
						html += '</tbody></table>';
						updateMainContent(html);
						
						
						$('#ipmiTable').tableFilter(options);
						
					});
 
}

function loadTermServerPage() 
{
	sendAjaxRequest("get_term_info", "", 
					function(response) {
						var html = "";
						html += '<table id="ipmiTable" class="table table-striped">';
						html 	+= '<thead><tr><th>Machine Name</th><th>Term Server</th><th>Port</th></tr></thead>';
                        html    += '<tbody>';
                        
						for(var i=0; i<response.data.length; i++)
						{
						
						  var  termServer = response.data[i].termServer;
						  var  termPort = response.data[i].termPort;
                            
                            html += '<tr>';
						
							html 	+= '<td>' + response.data[i].tb_name + '</td>';
							html 	+= '<td>' + getVariableNullValue(termServer) + '</td>';
							html 	+= '<td>' + getVariableNullValue(termPort) + '</td>';

                           html += '</tr>';
						}
						html += '</tbody></table>';
						updateMainContent(html);
						
						$('#ipmiTable').tableFilter(options);
					});
}

function loadRpbPage() 
{
	var query = 'SELECT Rpb.rpb,tb.rpbPort,tb.tb_name FROM Rpb LEFT JOIN tb ON Rpb.rpb=tb.rpb';
	sendAjaxRequest("run_select_db_query", "query=" + query, 
					function(response) {
						var html = "";
						html += '<table id="ipmiTable" class="table table-striped">';
						html 	+= '<thead><tr><th>Remote Power Booter</th><th>Port</th><th>machine</th></tr></thead>';
                        html    += '<tbody>';
 
						for(var i=0; i<response.data.length; i++)
						{
                            html += '<tr>';
							html 	+= '<td>' + response.data[i].rpb + '</td>';
							html 	+= '<td>' + response.data[i].rpbPort + '</td>';
							html 	+= '<td>' + response.data[i].tb_name + '</td>';
                            html += '</tr>';
						}
						html += '</tbody></table>';
						updateMainContent(html);
						
						$('#ipmiTable').tableFilter(options);
						
					});
}

function isUserLoggedIn()
{

    sendAjaxRequest("check_user_login", "",	
                   function(response) {
                        if(response.loggedin) {			
	                       return true;
						 }
						 else {
                            showPopupModal("Not Logged In!", "You need to be logged in to do this operation", "", "300");
							return false;
                        }
    });
}

function deleteCardFromDB(serial) {
	if (isUserLoggedIn) {
	   return 1;
	}
	var query = 'delete from cards where serial="' + serial + '"';
	var postVars = "query=" + query;
	sendAjaxRequest("run_single_db_query", postVars, 
							function(response) {
								updateMainContent("Database updated");
								loadAllTestBeds();
							});

}

function loadCardPage(serial)
{
	sendAjaxRequest("check_user_login", "",	
                   function(response) {
                        if(response.loggedin) {			
	                       var html = "Please select the action  for card: " + serial;
                           html  += '</br></br><button class="  btn btn-danger" type="button"  onclick="deleteCardFromDB(\'' + serial + '\')"><B>Delete from DB!</B></button>';
  
	                       updateMainContent(html);
						 }
						 else {
                            showPopupModal("Not Logged In!", "You need to be logged in to do this operation", "", "300");
							return false;
                        }
    });
  
}
                                             
                                      
                                             
function getIOStatData() 
{   
                                             
                                                                             
	sendAjaxRequest("get_iostat_data", "", 
					function(response) {
                                            readIOPS = []; 
                                           count = []; 
                                               
                                                writeIOPS = [];
                                               
                                                for(var i=0; i<response.data.length; i++) {
                                                  var mname = response.data[i].machineName;
                                                  readIOPS.push(response.data[i].readIOPs);
                                                  writeIOPS.push(response.data[i].writeIOPs);
                                                  count.push(i);
                                                  
                                                
                                                }
                                                count = covertArrayToInteger(count);
                                                 readIOPS = covertArrayToInteger(readIOPS);
                                                 writeIOPS = covertArrayToInteger(writeIOPS);
                                                 plotGraph6(count,readIOPS,writeIOPS);
	                                         //setInterval(getIOStatData,30000);
												//readIOPS = covertArrayToInteger(readIOPS);
												
												//alert(readIOPS);
												
                                               
                        });
                     
}

function plotGraph6(count,reads,writes) {

//alert(reads);\
 var chart1;                                      
if(chart1) chart.destroy();
chart1 = new Highcharts.Chart({
         //renderTo: 'mainContentSiteDiv',                                         
         chart: { renderTo: 'mainContentSiteDivTopMsg'},
//          chart: { renderTo: 'container1'},                                       
         title: {text: 'REead/Write Details ' },
         xAxis: {categories: count},
         yAxis: {title: {text: 'IOPS'}},
         //series: [{name: 'redhat6',data: [2, 1, 4]}, {name: 'redhat5',data: [5, 7, 3]}]
		 series: [{name: 'reads',data: reads},{name: 'writes',data: writes}]
		 
		 //series: reads
  });    
			

}

function plotGraph7() {
   //var count = getIOStatData()[0] ;
   //var reads = getIOStatData()[1] ;
   //alert(reads);
   
   // $(document).ready(function() {

  Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
    
        var chart;
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'mainContentSiteDiv',
                type: 'spline',
                marginRight: 10,
                events: {
                    load: function() {
    
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function() {
                            var x = (new Date()).getTime(), // current time
                                y = getIOStatReadData1() ;
								//y = Math.random();
								//alert(y);
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function() {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
    
                    for (i = -19; i <= 0; i++) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                })()
            }]
        });
    
}


function getIOStatReadData1() {
  var query = 'select readIOPS from iostat where machineName=\"sqa12-oracle\" order by collumn_1 desc limit 1';

  var postVars = "query=" + query;
  var data = ""
  sendAjaxRequest("run_select_db_query", postVars, 
                        function(response) {
                            data = response.data[0].readIOPS;
							
                        });
  return data;
}

function getIOStatReadData() {
   alert(getIOStatReadData1());
}



function requestData() {

    point = ["1","2"];
   alert(chart);
        
     var series = chart.series[0],shift = series.data.length > 20;
          alert(series.data.length);  
           //alert(series);

            // add the point
            
            
            chart.series[0].addPoint(point, true, shift);
             
            

            // call it again after ten second
            setTimeout(requestData, 1000);
        
}




function h1() {
    //alert("heee");
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'mainContentSiteDiv',
            defaultSeriesType: 'line',
            width: 800,
            events: {
                load: requestData
            }
        },
            credits: {
            text: 'Copyright Virident Systems 2012',
            href: 'http://www.virident.com'
        },
        title: {
            text: 'Database OLTP-workload 5000 Warehouse'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100,
            maxZoom: 20 * 1000
        },
        yAxis: {
            min: 0,
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Transactions',
                margin: 80
            }
        },

 series: [

      {
            name: 'Virident FlashMax II',
            data: []
        },
      
      ]
    });
    alert(chart);
 }
 
function loadIPMITermServerPage() 


{

sendAjaxRequest("get_ipmi_term_info", "", 
					function(response) {
						var html = "";
						html += '<table id="ipmiTable" class="table table-striped">';
						html 	+= '<thead><tr><th>Machine Name</th><th>IPMI addr</th><th>User id</th><th> passwd</th><th> Rpb</th><th> RpbPort</th><th> TermServer</th><th> termPort</th></tr></thead>';
                        html    += '<tbody>';
                        
						for(var i=0; i<response.data.length; i++)
						{
						
						  var  ipmi_addr = response.data[i].ipmi_addr;
						  var  ipmi_userid = response.data[i].ipmi_userid;
						  var  ipmi_passwd = response.data[i].ipmi_passwd;
						  
						  
                      
                            html += '<tr>';
						
							html 	+= '<td>' + response.data[i].tb_name + '</td>';
							//html 	+= '<td>' + getVariableNullValue(ipmi_addr) + '</td>';
							
							var ipmi_addr = getVariableNullValue(ipmi_addr);
							var mname = response.data[i].tb_name;
							
							type = "ipmi";
							//html 	+= '<td onClick="javascript: updateIPMIMachine(\'' + mname + '\',\'' + type + '\')>' + '<div class="edit1" id="edit1"  >' + ipmi_addr + '</div>' + '</td>';
							html 	+= '<td onClick="javascript: updateIPMIMachine(\'' + mname + '\',\'' + type + '\')">' + '<div class="edit1" id="edit1"  >' + ipmi_addr + '</div>' + '</td>';
							//html 	+= '<td onClick="javascript: updateIPMIMachine(\'' + mname + '\')">' + '<div class="edit1" id="edit1"  >' + ipmi_addr + '</div>' + '</td>';
							//html 	+= '<td onClick="javascript: updateIPMIMachine(\'' + mname + '\')">' + '<div class="ostype" id="ostype"  >' + osType + '</div>' + '</td>';
							//html 	+= '<td>' + ipmi_userid + '</td>';
							//html 	+= '<td>' + ipmi_passwd + '</td>';
							
                                                        type="ipmi_userid";
							
							html 	+= '<td onClick="javascript: updateIPMIMachine(\'' + mname + '\',\'' + type + '\')">' + '<div class="edit1" id="edit1"  >' + ipmi_userid + '</div>' + '</td>';
                                                        
                                                        type="ipmi_passwd";
							
							html 	+= '<td onClick="javascript: updateIPMIMachine(\'' + mname + '\',\'' + type + '\')">' + '<div class="edit1" id="edit1"  >' + ipmi_passwd + '</div>' + '</td>';
                                                        
                                                        
							type="rpb";
							rpb = response.data[i].rpb;
							html 	+= '<td onClick="javascript: updateRpbMachine(\'' + mname + '\',\'' + type + '\')">' + '<div class="rpb" id="rpb"  >' + rpb + '</div>' + '</td>';
							
							type="rpbPort";
							rpbPort = response.data[i].rpbPort;
							html 	+= '<td onClick="javascript: updateIPMIMachine(\'' + mname + '\',\'' + type + '\')">' + '<div class="edit1" id="edit1"  >' + rpbPort + '</div>' + '</td>';
							
							
							type="termServer";
							termServer = response.data[i].termServer;
							html 	+= '<td onClick="javascript: updateIPMIMachine(\'' + mname + '\',\'' + type + '\')">' + '<div class="edit1" id="edit1"  >' + termServer + '</div>' + '</td>';
							
							type="termPort";
							termPort = response.data[i].termPort;
							html 	+= '<td onClick="javascript: updateIPMIMachine(\'' + mname + '\',\'' + type + '\')">' + '<div class="edit1" id="edit1"  >' + termPort + '</div>' + '</td>';
							
							//html 	+= '<td>' + response.data[i].rpb + '</td>';
							//html 	+= '<td>' + response.data[i].termServer + '</td>';
							//html 	+= '<td>' + response.data[i].termPort + '</td>';
							//html 	+= '<td>' +  cpuStr + '</td>';
								

                        html += '</tr>';    
  
						}
						html += '</tbody></table>';
						updateMainContent(html);
						
						
						$('#ipmiTable').tableFilter(options);
						
					});
 
}

function updateMachineCard(serial) {
	$('.edit1').editable(function(value, settings) { 
                        var mname = value;
						var postVars = "machine_name=" + mname + "&card_serial=" + serial;
                        sendAjaxRequest("update_card_machine", postVars, 
                        function(response) {
                            updateMainContent("Database updated");
							loadAllCards();
                        });
                           //return(value);
                         }, { 
                          type    : 'textarea',
                          submit  : 'OK',
						  cancel    : 'Cancel',
						  tooltip : 'Click to edit...'
                        });
}
 
 function updateIPMIMachine(mname,type) {
	$('.edit1').editable(function(value, settings) { 
                        //var ipmi_addr = value;
						
						//alert(type);
						//type = "ipmi";
						if (type == "ipmi") {
						   var query = 'update tb set ipmi_addr="' + value + '"' +  ' where tb_name="' + mname + '"';
						   
						} else if (type == "rpb") {
						
						  var query = 'update tb set rpb="' + value + '"' +  ' where tb_name="' + mname + '"';

						} else if (type == "termServer") {
						
						  var query = 'update tb set termServer="' + value + '"' +  ' where tb_name="' + mname + '"';

						} else if (type == "termPort") {
						
						  var query = 'update tb set termPort="' + value + '"' +  ' where tb_name="' + mname + '"';
						 
						
                                                
                                                } else if (type == "ipmi_userid") {
						
						  var query = 'update tb set ipmi_userid="' + value + '"' +  ' where tb_name="' + mname + '"';
						 
						
                                                
                                                } else if (type == "ipmi_passwd") {
						
						  var query = 'update tb set ipmi_passwd="' + value + '"' +  ' where tb_name="' + mname + '"';
						 
						} 
                                                else if (type == "rpbPort") {
						
						  var query = 'update tb set rpbPort="' + value + '"' +  ' where tb_name="' + mname + '"';

						} else {
						  alert ("ERRor:How did i get here");
						}
						
						//var postVars = "machine_name=" + mname + "&osType=" + osType;
						var postVars = "query=" + query;
                        sendAjaxRequest("run_single_db_query", postVars, 
                        function(response) {
						    
                            updateMainContent("Database updated");
							loadIPMITermServerPage();
                        });
						  return comment;
                           //return(value);
                         },  { 
                          type    : 'textarea',
                          submit  : 'OK',
						  cancel    : 'Cancel',
						  tooltip : 'Click to edit...'
                        });
}

                                                    
function getRpbs() {
                       rpbs = {};
                       var query = 'select rpb from Rpb'; 
                       var postVars = "query=" + query;                                                                                                          
                       sendAjaxRequest("run_select_db_query", postVars, 
                        function(response) {
                             //rpbs = {};                      
                             for(var i=0; i<response.data.length; i++) {
                             
                                                  var rpb = response.data[i].rpb;
                                                  //alert(rpb);
                                                  rpbs[rpb] = rpb;
                                                  //alert(rpbs[rpb]);
                                                  
                                                  
                                                
                                                }                       
			   		    
                            
							//loadAllTestBeds();
                        });
         //alert(rpbs);                 
       return rpbs;                                             
}                                                    
function updateRpbMachine(mname,type) {
        rpbs = getRpbs();                
	$('.rpb').editable(function(value, settings) { 
                        //var osType = value;
                                                //alert(value);
						var query = 'update tb set rpb="' + value + '"' +  ' where tb_name="' + mname + '"';
						
						//var postVars = "machine_name=" + mname + "&osType=" + osType;
						var postVars = "query=" + query;
                        sendAjaxRequest("run_single_db_query", postVars, 
                        function(response) {
						    
                            updateMainContent("Database updated");
							loadIPMITermServerPage();
                        });
						  return comment;
                           //return(value);
                         }, { 
						 //data   : " {'Linux':'Linux','Windows':'Windows','ESXi':'ESXi'}",
                                                 data   : rpbs,
                          type   : 'select',
                          //type    : 'textarea',
                          submit  : 'OK',
						  cancel    : 'Cancel',
						  
                        });
}

function insertRpbPage()
{

 var fields1del =  '<label>Enter Machine Info</label>\
	            <input class="span3" type="text" placeholder="Machine name"    name="machine_name" value="" id="machine_name" /></BR>\
				<input class="span3" type="text" placeholder="optional .. ip addr "    name="mIPaddr" value="" id="mIPaddr" /></BR>\
				<input class="span3" type="text" placeholder="optional .os Type Linux,Windows,ESXi "    name="osType" value="" id="osType" /></BR>\
				<input class="span3" type="text" placeholder="optional total Memory ..eg. 24G "    name="totalMemory" value="" id="totalMemory" /></BR>\
				<input class="span3" type="text" placeholder="optional total Cpus ..eg. 24 "    name="totalCpus" value="" id="totalCpus" /></BR>\
				<input class="span3" type="text" placeholder="optional cpuType ..eg.Intel E5540@2.53GHz"    name="cpuType" value="" id="cpuType" /></BR>';
				
   var fields =  '<label>Enter Rpb Info</label>\
                  <input class="span3" type="text" placeholder="Rpb name"    name="rpb" value="" id="rpb" /></BR>\
				  <input class="span3" type="text" placeholder="user name"    name="usernmae" value="" id="username" /></BR>\
	              <input class="span3" type="text" placeholder="password"    name="password" value="" id="password" /></BR>';
				
				

	
	var body = fields;
	
	var footer = '<button class="btn btn-success" onClick="javascript: enter_rpb_info();" name="submit"><i class="icon-share-alt icon-white"></i>&nbsp;<b>Enter!</b></button>\
					<button class="btn btn-warning" onClick="javascript: hidePopupModal()" name="submit"><i class="icon-remove icon-white"></i>&nbsp;<B>Cancel</b></button>';
	
    sendAjaxRequest("check_user_login", "",	
                   function(response) {
                        if(response.loggedin) {			
	                       showPopupModal("Rpb-Info", body, footer, "300");
						 }
						 else {
                            showPopupModal("Not Logged In!", "You need to be logged in to enter rpb info", "", "300");
                        }
    });

}

