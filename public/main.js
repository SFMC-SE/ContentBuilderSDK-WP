// IMAGE LOAD

// get image data from data.json
//$.getJSON("images.json", function(data) {
//		var returnedImages = '';
		// loop through each value to dynamically build html from json data values and build image elements
//		$.each(data, function(key, value) {
//				returnedImages += '<img class="slds-p-around_xxx-small ' + value.tag + '" src="' + value.location + '" alt="' + value.name + '" width="100" height="100">';
//		});
		// append html generated to cms-images div
//		$('#cms-images').html(returnedImages);
//});

//var debounce = _.debounce(setImage(), 500);

function debounce (func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

// SDK

var sdk = new window.sfdc.BlockSDK();

var link, width, height, imageurl;

function blockSettings () {
	document.getElementById('image-link').value = link;
	document.getElementById('slider-image-width').value = width;
	document.getElementById('slider-image-height').value = height;
}

function sliderValues () {
	document.getElementById('slider-image-width-val').innerHTML = document.getElementById('slider-image-width').value;
	document.getElementById('slider-image-height-val').innerHTML = document.getElementById('slider-image-height').value;
//    debounce();
}

function setImage() {
	link = document.getElementById('image-link').value;
	width = document.getElementById('slider-image-width').value;
	height = document.getElementById('slider-image-height').value;
    sdk.setContent('<a href="' + link + '"><img align = "center" height="' + height + '" width="' + width + '" src="' + imageurl + '" /></a>');
	sdk.setData({
	link: link,
	width: width,
	height: height,
	imageurl: imageurl
	});
}

sdk.getData(function (data) {
	link = data.link || '';
	width = data.width || 300;
	height = data.height || 300;
	imageurl = data.imageurl || '';
    blockSettings();
	sliderValues();
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

// EVENT LISTENERS


// set image url after user click
$("#cms-images").children("img").click(function() {
    imageurl = $(this).attr('src');
    setImage();
//    debounce();
})

$("#slider-image-width, #slider-image-height, #image-link").change(function() {
//    debounce();
//	debounce(setImage, 500)();
    sliderValues();
    setImage();
})
