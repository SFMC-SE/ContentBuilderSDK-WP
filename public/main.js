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

var link, width, height, imageurl, val;

//function imageAlignment(form, name) {
//    var val;
    // get list of radio buttons with specified name
//    var radios = form.elements[name];

    // loop through list of radio buttons
//    for (var i=0, len=radios.length; i<len; i++) {
//        if ( radios[i].checked ) { // radio checked?
//            val = radios[i].value; // if so, hold its value in val
//            break; // and break out of for loop
  //      }
//    }
//    return val; // return value of checked radio or undefined if none checked
//}

function blockSettings () {
	document.getElementById('image-link').value = link;
	document.getElementById('slider-image-width').value = width;
	document.getElementById('slider-image-height').value = height;
}

function sliderValues () {
	document.getElementById('slider-image-width-val').innerHTML = document.getElementById('slider-image-width').value;
	document.getElementById('slider-image-height-val').innerHTML = document.getElementById('slider-image-height').value;
}

function setImage() {
	link = document.getElementById('image-link').value;
	width = document.getElementById('slider-image-width').value;
	height = document.getElementById('slider-image-height').value;
//    sdk.setContent('<a href="' + link + '"><img height="' + height + '" width="' + width + '" src="' + imageurl + '" /></a>');
    sdk.setContent('<div style="display: flex; justify-content: center;"> <a href="' + link + '"><img height="' + height + '" width="' + width + '" src="' + imageurl + '" /></a></div>');
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
	imageurl = data.imageurl || 'https://experts-cb-sdk-wordpress.herokuapp.com/wordpress-logo.jpg';
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
})

$("#slider-image-width, #slider-image-height, #image-link").change(function() {
    sliderValues();
    setImage();
})
