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

// SDK

var sdk = new window.sfdc.BlockSDK();

var link, width, height, imageurl, alignment, scale;

function blockSettings () {
	document.getElementById('image-link').value = link;
	document.getElementById('slider-image-width').value = width;
	document.getElementById('slider-image-height').value = height;
//	document.querySelector('input[name="alignment"]:checked').value = alignment;
//	$('input[name="alignment"]:checked').val() = alignment;
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
	width = data.width || 300;
	height = data.height || 300;
	imageurl = data.imageurl || 'https://experts-cb-sdk-wordpress.herokuapp.com/wordpress-logo.jpg';
	alignment = data.alignment || 'center';
	scale = data.scale || '';
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

//disable sliderValues
//#slider-image-width
//#slider-image-height
//$("#image-scale").change(function() {
//	if (scale === "yes") {
//		$("#slider-image-height").add('disabled="yes"');
//	}
//})

// set image url after user click
$("#cms-images").children("img").click(function() {
    imageurl = $(this).attr('src');
    setImage();
})

$("#slider-image-width, #slider-image-height, #image-link, #image-alignment, #image-scale").change(function() {
    sliderValues();
    setImage();
})
