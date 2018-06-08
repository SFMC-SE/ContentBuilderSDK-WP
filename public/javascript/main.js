// function on change of dropdown issue ajax call with filter for media category

//$.getJSON("/javascript/images.json", function(data) {
//		var returnedImages = '';
		// loop through each value to dynamically build html from json data values and build image elements
//		$.each(data, function(key, value) {
//				returnedImages += '<img class="slds-p-around_xxx-small ' + value.tag + '" src="' + value.location + '" alt="' + value.name + '" width="100" height="100">';
//		});
		// append html generated to cms-images div
//		$('#cms-images').html(returnedImages);
//		$('#cms-images>img').css('cursor', 'pointer');
//		callLinks();
//});

// get image data from images.json
var returnedImages, imageJSON, imageJSONExtend, numMedia, numPages;

(function() {
 $.getJSON(wpEndPoint + '?per_page=100&fields=source_url')

	.done(function(data, status, request) {
		numMedia = request.getResponseHeader('x-wp-total');
		numPages = request.getResponseHeader('x-wp-totalpages');
		console.log(numMedia);
		console.log(numPages);
		// loop through each value to dynamically build html from json data values and build image elements
		$.each(data, function(key, value) {
				returnedImages += '<img class="slds-p-around_xxx-small" src="' + value.source_url + '" width="100" height="100">';
		});
		// append html generated to cms-images div
		$('#cms-images').html(returnedImages);
		$('#cms-images>img').css('cursor', 'pointer');
		callLinks();
		//build json
		for (var i=1; i <= numPages; i++) {
			imageJSON = $.getJSON(wpEndPoint + '?page=' + i + '&per_page=100&fields=source_url,media_details.file')
//not working use each maybe...
			$.extend(imageJSONExtend,imageJSON);
		}
					console.log(imageJSONExtend);
//		var obj = jQuery.parseJSON(imageJSON);
//		console.log(obj.lenth);
//		var numelements = imageJSON.source_url.length;
//		console.log(numelements);

		})
})();

// SDK

var sdk = new window.sfdc.BlockSDK();

var link, width, height, scale, alignment, imageurl;

function blockSettings () {
	document.getElementById('image-link').value = link;
	document.getElementById('slider-image-width').value = width;
	document.getElementById('slider-image-height').value = height;
	document.getElementById('slider-image-width-val').innerHTML = width;
	document.getElementById('slider-image-height-val').innerHTML = height;

	if (scale === "yes") {
		document.getElementById('scale-yes').setAttribute("checked", "checked");
	} else {
		document.getElementById('scale-yes').removeAttribute("checked");
		document.getElementById('scale-no').setAttribute("checked", "checked");
	}

	if (alignment === "left") {
		document.getElementById('image-left').setAttribute("checked", "checked");
		document.getElementById('image-center').removeAttribute("checked");
		document.getElementById('image-right').removeAttribute("checked");
	} else if (alignment === "right") {
		document.getElementById('image-left').removeAttribute("checked");
		document.getElementById('image-center').removeAttribute("checked");
		document.getElementById('image-right').setAttribute("checked", "checked");
	} else {
		document.getElementById('image-left').removeAttribute("checked");
		document.getElementById('image-center').setAttribute("checked", "checked");
		document.getElementById('image-right').removeAttribute("checked");
	}
	disableOptions();
}


function sliderValues () {
	document.getElementById('slider-image-width-val').innerHTML = document.getElementById('slider-image-width').value;
	document.getElementById('slider-image-height-val').innerHTML = document.getElementById('slider-image-height').value;
}

function setImage() {
	link = document.getElementById('image-link').value;
	width = document.getElementById('slider-image-width').value;
	height = document.getElementById('slider-image-height').value;
	alignment = document.querySelector('input[name="alignment"]:checked').value;
	scale = document.querySelector('input[name="scale"]:checked').value;
	if (scale === "yes") {
  	sdk.setContent('<div style="text-align: ' + alignment + ';"> <a href="' + link + '"><img style="max-width: 100%" src="' + imageurl + '" /></a></div>');
	} else {
		sdk.setContent('<div style="text-align: ' + alignment + ';"> <a href="' + link + '"><img height="' + height + '" width="' + width + '" src="' + imageurl + '" /></a></div>');
	}
	sdk.setData({
	link: link,
	width: width,
	height: height,
	imageurl: imageurl,
	alignment: alignment,
	scale: scale
	});
}

sdk.getData(function (data) {
	link = data.link || '';
	width = data.width || '300';
	height = data.height || '300';
	imageurl = data.imageurl || 'https://experts-cb-sdk-wordpress.herokuapp.com/images/wordpress-logo.jpg';
	alignment = data.alignment || 'center';
	scale = data.scale || 'no';
    blockSettings();
    setImage();
});


// BUTTONS

// filter results based on buttons selected
var $btns = $('.slds-button_neutral').click(function() {
// if all is selected show all elements in main div - by default the page loads with all values selected
if (this.id == 'all') {
		$('#cms-images > img').show();
} else {
		// take id from selected button and create var with class value same as id, hide those elements that don't have that class
		var $el = $('.' + this.id).show();
		$('#cms-images > img').not($el).hide();
}
// remove active class from all buttons
$btns.removeClass('active');
// add active class to selected button
$(this).addClass('active');
})

//disable slider values & alignment when scale to fit is selected
function disableOptions () {
	if (document.querySelector('input[name="scale"]:checked').value === "yes") {
		document.getElementById('slider-image-height').setAttribute("disabled","");
		document.getElementById('slider-image-width').setAttribute("disabled","");
		document.getElementById('image-left').setAttribute("disabled","");
		document.getElementById('image-center').setAttribute("disabled","");
		document.getElementById('image-right').setAttribute("disabled","");
	} else {
		document.getElementById('slider-image-height').removeAttribute("disabled");
		document.getElementById('slider-image-width').removeAttribute("disabled");
		document.getElementById('image-left').removeAttribute("disabled");
		document.getElementById('image-center').removeAttribute("disabled");
		document.getElementById('image-right').removeAttribute("disabled");
	}
}

// Event Listeners
document.getElementById("image-scale").addEventListener("click", disableOptions);
document.getElementById("slider-image-width").addEventListener("change", sliderValues);
document.getElementById("slider-image-width").addEventListener("change", setImage);
document.getElementById("slider-image-height").addEventListener("change", sliderValues);
document.getElementById("slider-image-height").addEventListener("change", setImage);
document.getElementById("image-link").addEventListener("change", setImage);
document.getElementById("image-alignment").addEventListener("change", setImage);
document.getElementById("image-scale").addEventListener("change", setImage);

// set image url after user click
function callLinks () {
	$("#cms-images").children("img").click(function() {
	    imageurl = $(this).attr('src');
	    setImage();
	})
}
