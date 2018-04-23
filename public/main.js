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
	var imageurl;
	var imagealt;

	$("img").click(function(){
	  var imagealt = $(this).attr("alt");
	  var imageurl = $(this).attr("src");
		console.log("Alt Text: " + imagealt + "|| Image Source: " + imageurl);
	});

	sdk.getContent(function (content) {

		function saveText() {
			sdk.setContent(imagealt);
			sdk.setSuperContent('This is super content: ' + imageurl);

			sdk.getData(function (data) {
				var numberOfEdits = data.numberOfEdits || 0;
				sdk.setData({
					numberOfEdits: numberOfEdits + 1
				});
			});

			sdk.getCentralData(function (central) {
				var totalNumberOfEdits = central.totalNumberOfEdits || 0;
				sdk.setCentralData({
					totalNumberOfEdits: totalNumberOfEdits + 1
				});
			});
		}
	});

	//function saveText() {
	//  sdk.setContent(imageurl);
	//  sdk.setSuperContent('This is super content: ' + imagealt)
	//}

//}
