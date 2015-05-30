//Problem: 
		// Compression of Javascript files is sometimes a portion of other plugins. 
		// A stand-alone application for javascript compression would be great.
		
//To Do: 
		// Read through a file; 
		// have the type of whitespace / how much eliminated based on settings (i.e. extended, compressed, etc.); 
		// eliminate whitespace;
		// determine if a group of files should be compressed seperately, or into a single file;
		// write to new file(s);

//----------------------------------------------------Requires

var fs = require('fs');

//----------------------------------------------------Settings

var options = {//default options for compression
	"encoding": "utf8",
	"flag": "r",
	"compression": "compressed",
	"comments": "no"
}

var origLink = 'js/scripts/script.js';//link variable
var depoLink = 'js/script.js';


//---------------------------------------------------Functions

function cmprss(compr,comm,data){//compression function

	if(compr === "compressed"){
		var newString = data.replace(/(\r\n|\n|\r|\t)/gm, "");

		writeFile(newString);
	}
}

function writeFile(data){
	fs.writeFile(depoLink, data, function (err) {
		if (err) throw err;
	});
}



//-----------------------------------------------------Action
fs.readFile(origLink,options, function (err, data) {
	if(err) throw err;
  	
	cmprss(options.compression,options.comments,data);
});
