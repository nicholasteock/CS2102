var View     = require('./view'),
	template = require('./templates/listing')

var getRenderData = function() {
	if(localStorage.userId == undefined || localStorage.name == undefined) {
		alert("Please log in to continue");
		Application.router.navigate('login', {trigger: true});
		return false;
	}

	var	dfdResult = $.Deferred();

	var onSuccess = function( response ) {
		return dfdResult.resolve( response );
	};
	
	var onError = function( response ) {
		return dfdResult.reject( response );
	};

	var data = {};
	var hash = window.location.hash;
	if(hash.indexOf("?") != -1) {
		var filters = hash.substring(hash.indexOf("?")+1);
		var filterArr = filters.split("&");
		for(var i=0, iLen=filterArr.length; i<iLen; i++) {
			var temp = filterArr[i].split("=");
			data[temp[0]] = temp[1];
		}
	}

	$.ajax({
			url 		: Application.api+"movielisting",
			type 		: "POST",
			dataType	: 'json',
			data 		: data,
			success		: onSuccess,
			error		: onError
	});
	
	return dfdResult;
};

var logout = function() {
	localStorage.removeItem('userId');
	localStorage.removeItem('name');
	localStorage.removeItem('userType');
	localStorage.removeItem('booking');
	Application.router.navigate('login', {trigger: true});
	return false;
};

var adminpanel = function() {
	Application.router.navigate('admin', {trigger: true});
	return false;
};

var editpanel = function() {
	Application.router.navigate('bookingmanagement', {trigger: true});
	return false;
};

var languageSelected = function(ev) {
	$("#filterLanguage").html(ev.target.text);
};

var subtitlesSelected = function(ev) {
	$("#filterSubtitles").html(ev.target.text);
};

var mdaratingSelected = function(ev) {
	$("#filtermdarating").html(ev.target.text);
};

var ratingChanged = function() {
	var ratingSelected = $("#ratingDropdown").val();

	if(ratingSelected != "None") {
		$("#alphaDropdown").val("None").prop('disabled', 'disabled');
	}
	else {
		$("#alphaDropdown").prop('disabled', false);
	}
};

var alphaChanged = function() {
	var alphaSelected = $("#alphaDropdown").val();

	if(alphaSelected != "None") {
		$("#ratingDropdown").val("None").prop('disabled', 'disabled');
	}
	else {
		$("#ratingDropdown").prop('disabled', false);
	}
};

// var ratingSelected = function(ev) {
// 	$("#filterRating").html(ev.target.text);
// };

var resetFilter = function(ev) {
	$("#filterTitle").val("");
	$("#filterLanguage").html("All Languages");
	$("#filterSubtitles").html("All Subtitles");
	$("#filtermdarating").html("All MDA Ratings");
	$("#ratingDropdown").val("None");
	$("#alphaDropdown").val("None");
	$("#filterSubmit").click();
	return;
}

var submitFilter = function() {
	var title 		= $("#filterTitle").val();
	var language 	= $("#filterLanguage").text();
	var subtitles 	= $("#filterSubtitles").text();
	var mdarating 	= $("#filtermdarating").text();
	var ratingorder = $("#ratingDropdown").val();
	var alphaorder 	= $("#alphaDropdown").val();

	var temp = "";
	var queryParams = [];
	var queryString = "?";

	if(title.length > 0) {
		temp="title="+encodeURI(title);
		queryParams.push(temp);
	}

	if(language != "All Languages") {
		temp="languages="+encodeURI(language);
		queryParams.push(temp);
	}

	if(subtitles != "All Subtitles") {
		temp="subtitles="+encodeURI(subtitles);
		queryParams.push(temp);
	}

	if(mdarating != "All MDA Ratings") {
		temp="mdarating="+encodeURI(mdarating);
		queryParams.push(temp);
	}

	if(ratingorder != "None") {
		temp="ratingorder="+encodeURI(ratingorder);
		queryParams.push(temp);
	}

	if(alphaorder != "None") {
		temp="alphaorder="+encodeURI(alphaorder);
		queryParams.push(temp);
	}

	queryString = "?"+queryParams.join("&");

	window.location.hash = "#/listing"+queryString;
	window.location.hash = "#/listing"+queryString;
	return false;
};

var afterRender = function(){
	var hash = window.location.hash;
	var data = hash.substring(hash.indexOf("?"));
	var dataArray = data.split("&");
	var temp = "";

	if(dataArray.length != 0) {
		for( var i=0, iLen=dataArray.length; i<iLen; i++ ) {
			temp = "";

			if(dataArray[i].indexOf("languages") >= 0) {
				temp = dataArray[i];
				temp = temp.substring(temp.indexOf("=")+1);
				$("#filterLanguage").html(temp);
			}
			else if(dataArray[i].indexOf("subtitles") >= 0) {
				temp = dataArray[i];
				temp = temp.substring(temp.indexOf("=")+1);
				$("#filterSubtitles").html(temp);
			}
			else if(dataArray[i].indexOf("mdarating") >= 0) {
				temp = dataArray[i];
				temp = temp.substring(temp.indexOf("=")+1);
				$("#filtermdarating").html(temp);
			}
			else if(dataArray[i].indexOf("ratingorder") >= 0) {
				temp = dataArray[i];
				temp = temp.substring(temp.indexOf("=")+1);
				$("#ratingDropdown").val(temp);
				if(temp == "ASC" || temp =="DESC") {
					$("#alphaDropdown").val("None").prop("disabled", "disabled");
				}
			}
			else if(dataArray[i].indexOf("alphaorder") >= 0) {
				temp = dataArray[i];
				temp = temp.substring(temp.indexOf("=")+1);
				$("#alphaDropdown").val(temp);
				if(temp == "ASC" || temp =="DESC") {
					$("#ratingDropdown").val("None").prop("disabled", "disabled");
				}
			}
			else if(dataArray[i].indexOf("title") >= 0) {
				temp = dataArray[i];
				temp = temp.substring(temp.indexOf("=")+1);
				$("#filterTitle").val(temp);
			}
			else {}
		}
	}

	$(".loadingSpinner").addClass("hide");
	$(".filterContainer").removeClass("hide");
	$(".movielistingContainer").removeClass("hide");
	$(".logout").click(logout);
	$(".adminpanel").click(adminpanel);
	$(".editpanel").click(editpanel);
	$("#filterReset").click(resetFilter);
	$("#filterSubmit").click(submitFilter);
	$(".languageDropdown li").click(languageSelected);
	$(".subtitlesDropdown li").click(subtitlesSelected);
	$(".mdaratingDropdown li").click(mdaratingSelected);
	$("#ratingDropdown").change(ratingChanged);
	$("#alphaDropdown").change(alphaChanged);
};

var events = {
};

module.exports = View.extend({
    id 				: 'listing-view',
    events 			: events,
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template
});
