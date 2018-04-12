var BlockSDK = require('@salesforce-mc/blocksdk');

if (window.self === window.top) {
	document.body.innerText = 'This application is for use in the Salesforce Marketing Cloud Content Builder Editor only.';
} else {
	var sdk = new BlockSDK();

	sdk.getContent(function (content) {
		var quill = new Quill('#editor-container', {
			theme: 'snow'
		});
		quill.root.innerHTML = content;

		function saveText() {
			var html = quill.root.innerHTML;
			sdk.setContent(html);
			sdk.setSuperContent('This is super content: ' + html);

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

		quill.on('text-change', saveText);
	});
}
