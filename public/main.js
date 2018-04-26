
// IMAGE LOAD
// get image data from data.json
$.getJSON("images.json", function(data) {
		var returnedImages = '';
		// loop through each value to dynamically build html from json data values and load to tiles var
		$.each(data, function(key, value) {
				returnedImages += '<img class = "slds-p-around_xxx-small ' + value.tag + '" src="' + value.link + '" alt="' + value.name + '" width="100" height="100">';
		});
		// append html generated to cms-images div
		$('#cms-images').html(returnedImages);
});

// append an id to the selected image and remove id from any other selected images
//$('#cms-images').children('img')click(function() {
//	$('img').removeAttr('id');
//	$(this).attr('id', 'selected-image');
//})

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



// SDK
var sdk = new window.sfdc.BlockSDK();

var link, width, height, imagealt, imageurl;

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

function blockSettings () {
	document.getElementById('image-link').value = link;
	document.getElementById('slider-image-width').value = width;
	document.getElementById('slider-image-height').value = height;
	document.getElementById('selected-image').src = imageurl;
}

function sliderValues () {
	document.getElementById('slider-image-width-val').innerHTML = document.getElementById('slider-image-width').value;
	document.getElementById('slider-image-height-val').innerHTML = document.getElementById('slider-image-height').value;
}

function setImage() {
	link = document.getElementById('image-link').value;
	width = document.getElementById('slider-image-width').value;
	height = document.getElementById('slider-image-height').value;
	imageurl = document.getElementById('selected-image').src;
		sdk.setContent('<a href="' + link + '"><img height="' + height + '" width="' + width + '" src="' + imageurl + '" /></a>');
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

// EVENT LISTENERS

document.getElementById('slider-image-width').addEventListener("input", function () {
	debounce(setImage, 500)();
	sliderValues();
});

document.getElementById('slider-image-height').addEventListener("input", function () {
	debounce(setImage, 500)();
	sliderValues();
});

document.getElementById('image-link').addEventListener("blur", function () {
	debounce(setImage, 500)();
	sliderValues();
});

document.getElementById('cms-images').addEventListener("click", function () {
	debounce(setImage, 500)();
	sliderValues();
});

// BUTTONS
// filter results based on buttons selected
//var $btns = $('.slds-button_neutral').click(function() {
// if all is selected show all elements in main div - by default the page loads with all values selected
//if (this.id == 'all') {
//    $('#cms-images > img').show();
//} else {
    // take id from selected button and create var with class value same as id, hide those elements that don't have that class
//    var $el = $('.' + this.id).show();
//    $('#cms-images > img').not($el).hide();
//}
// remove active class from all buttons
//$btns.removeClass('active');
// add active class to selected button
//$(this).addClass('active');
//})



//old code

// old code to set SDK values
//$("img").click(function(){
//  var imagealt = $(this).attr("alt");
//  var imageurl = $(this).attr("src");
  // set input from image-link as href of selected image
//  var link, height, width;
//  var link = $('#image-link').val();
//  var height= $('#slider-image-height').val();
//  var width= $('#slider-image-width').val();

//  var link = "www.google.com";
//  console.log("Alt Text: " + imagealt + "|| Image Source: " + imageurl);
//  console.log("height" + height + "|| width " + width);
//  sdk.setContent(imagealt);
//  sdk.setSuperContent('This is super content: ' + imageurl);
//  sdk.setContent('<a href="' + link + '"><img height="' + height + '" width="' + width + '" src="https://experts-cb-sdk-wordpress.herokuapp.com/' + imageurl + '" /></a>');
//});

// SLIDERS
// Update the displayed value of the sliders
//$("#slider-image-width").change(function() {
//  $('#slider-image-width-val').text($(this).val());
//});
//$("#slider-image-height").change(function() {
//  $('#slider-image-height-val').text($(this).val());
//});

//	imageurl = "avatar1.jpg";
	//set function to define image as active class
//	$("img").click(function(){
//	  var imagealt = $(this).attr("alt");
//	  var imageurl = $(this).attr("src");
	  // set input from image-link as href of selected image
//	  var link = $('#image-link').val();
//	  var height= $('#slider-image-height').val();
//	  var width= $('#slider-image-width').val();

	//  var link = "www.google.com";
//	  console.log("Alt Text: " + imagealt + "|| Image Source: " + imageurl);
//	  console.log("height" + height + "|| width " + width);
	//  sdk.setContent(imagealt);
	//  sdk.setSuperContent('This is super content: ' + imageurl);
//	  sdk.setContent('<a href="' + link + '"><img height="' + height + '" width="' + width + '" src="https://experts-cb-sdk-wordpress.herokuapp.com/' + imageurl + '" /></a>');
