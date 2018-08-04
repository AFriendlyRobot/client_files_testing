// Global is ugly, but it's just a proof of concept/benchmark
var state = {
	fileIndexMap: null,
	files: null
}

// Ref: https://www.html5rocks.com/en/tutorials/file/dndfiles/
function handleFiles() {
	if (window.FileReader) {
		// var f = document.getElementById("infile").files[0];

		// var reader = new FileReader();

		// reader.readAsText(f);
		// reader.onload = readhandler;
		// reader.onerror = errorhandler;

		state.files = document.getElementById("infile").files;
		state.fileIndexMap = makeFileIndexMap(state.files);

		makeButtons(state.files);
	} else {
		alert("File reading is not supported on your current browser!");
	}
}


function makeFileIndexMap(files) {
	var map = {};

	for (var i = 0; i < files.length; i++) {
		map[files.item(i).name.replace(" ", "_")] = i;
	}

	return map;
}


// Takes FileList
function makeButtons(fl) {
	$("#button-div").empty(); // Clear any previous buttons

	// Generate button for each file (crude, just proof of concept)
	for (var i = 0; i < Math.min(20, fl.length); i++) {
		// This file name cleaning would need to be improved
		var f = fl.item(i)
		var name = f.name.replace(" ", "_");

		var newID = "file-button-" + name;

		var buttonString  = '<button id="';
			buttonString += newID + '">' + name + '</button>';

		$("#button-div").append(buttonString);

		var btn = $(document.getElementById(newID));
		btn.attr("fname", name);
		btn.on("click", function(event) { showFile($(document.getElementById(event.target.id)).attr("fname")); });
		$("#button-div").append("<br />");
	}
}


function showFile(name) {
	console.log(name);
	if (state.fileIndexMap && (name in state.fileIndexMap)) {
		var index = state.fileIndexMap[name];
		var f = state.files.item(index);

		var reader = new FileReader();
		reader.readAsText(f);
		reader.onload = readHandler;
		reader.onerror = errorHandler;
	} else {
		alert("ERROR: Files not loaded or initialized correctly");
	}
}


function readHandler(event) {
	// I don't know if it's necessary to replace here
	var text = event.target.result.replace(/\r\n/, "\n");

	$("#file-div").empty();
	$("#file-div").append('<text class="file-text">' + text + '</text>');
}


function errorHandler(event) {
	alert("ERROR: " + event.target.error.name);
}


