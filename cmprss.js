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
	"compression": "compressed",
	"comments": "no",
	"input": "js/scripts/script.js",
	"output": "js/script.js",
	"encoding": "utf8",
	"flag": "r"
}

//---------------------------------------------------Functions

function cmprss(compr,comm,data){//compression function



	if(comm === "no"){
		data = stripComments(data);
	}

	if(compr === "compressed"){
		data = data.replace(/(\r\n|\n|\r|\t)/gm, "");
		data = data.replace(/\s+/g," ");
	} else if(compr === "compact"){
		data = data.replace(/\n\s*\n/g, '\n');
	} else if(compr === "none"){
	}

	writeFile(data);
}

function stripComments(stringIN) {//TAKEN FROM http://upshots.org/javascript/javascript-regexp-to-remove-comments#solution, from commentor bob;
	var SLASH = '/';
	var BACK_SLASH = '\\';
	var STAR = '*';
	var DOUBLE_QUOTE = '"';
	var SINGLE_QUOTE = "'";
	var NEW_LINE = '\n';
	var CARRIAGE_RETURN = '\r';
	
	var string = stringIN;
	var length = string.length;
	var position = 0;
	var output = [];
	
	function getCurrentCharacter () {
		return string.charAt(position);
	}
 
	function getPreviousCharacter () {
		return string.charAt(position - 1);
	}
 
	function getNextCharacter () {
		return string.charAt(position + 1);
	}
 
	function add () {
		output.push(getCurrentCharacter());
	}
 
	function next () {
		position++;
	}
 
	function atEnd () {
		return position >= length;
	}
 
	function isEscaping () {
		if (getPreviousCharacter() == BACK_SLASH) {
			var caret = position - 1;
			var escaped = true;
			while (caret-- > 0) {
				if (string.charAt(caret) != BACK_SLASH) {
					return escaped;
				}
				escaped = !escaped;
			}
			return escaped;
		}
		return false;
	}
 
	function processSingleQuotedString () {
		if (getCurrentCharacter() == SINGLE_QUOTE) {
			add();
			next();
			while (!atEnd()) {
				if (getCurrentCharacter() == SINGLE_QUOTE && !isEscaping()) {
					return;
				}
				add();
				next();
			}
		}
	}
 
	function processDoubleQuotedString () {
		if (getCurrentCharacter() == DOUBLE_QUOTE) {
			add();
			next();
			while (!atEnd()) {
				if (getCurrentCharacter() == DOUBLE_QUOTE && !isEscaping()) {
					return;
				}
				add();
				next();
			}
		}
	}
 
	function processSingleLineComment () {
		if (getCurrentCharacter() == SLASH) {
			if (getNextCharacter() == SLASH) {
				next();
				while (!atEnd()) {
					next();
					if (getCurrentCharacter() == NEW_LINE || getCurrentCharacter() == CARRIAGE_RETURN) {
						return;
					}
				}
			}
		}
	}
 
	function processMultiLineComment () {
		if (getCurrentCharacter() == SLASH) {
			if (getNextCharacter() == STAR) {
				next();
				next();
				while (!atEnd()) {
					next();
					if (getCurrentCharacter() == STAR) {
						if (getNextCharacter() == SLASH) {
							next();
							next();
							return;
						}
					}
				}
			}
		}
	}
	
	function processRegularExpression (){
		if (getCurrentCharacter() == SLASH) {
			add();
			next();
			while (!atEnd()) {
				if (getCurrentCharacter() == SLASH && !isEscaping()) {
					return;
				}
				add();
				next();
			}
		}
	}
 
	while (!atEnd()) {
		processDoubleQuotedString();
		processSingleQuotedString();
		processSingleLineComment();
		processMultiLineComment();
		processRegularExpression();
		if (!atEnd()) {
			add();
			next();
		}
	}
	return output.join('');
 
};



function writeFile(data){
	fs.writeFile(options.output, data, function (err) {
		if (err) throw err;
	});
}

function checkArgv(){//checks the arguments sent in from the process, essentially displays all menus
	var startTime = process.hrtime();
	var args = process.argv.slice(2);
	
	if(args.length > 0){
		if(	args[0] === "compressed" || args[0] === "compact" || args[0] === "none"){
			options.compression = args[0];
		} else if(args[0] === "-help" || args[0] === "help" || args[0] === "-h" || args[0] === "h" ){
			help();
			return;
		} else if(args[0] === "-settings" || args[0] === "settings" || args[0] === "-s" || args[0] === "s" ){
			settings();
			return;
		} else if(args[0] === "-commands" || args[0] === "commands" || args[0] === "-c" || args[0] === "c" ){
			commands();
			return;
		}else{
			console.error("UNKOWN INPUT: " + args[1] + "\n \t TYPE -help FOR LIST OF COMMANDS AND SETTINGS.");
			return;
		}
	}

	if(args.length > 1){
		if(args[1] === "yes" || args[1] === "no"){
			options.comments = args[1];
		}
	}

	if(args.length > 2){
		options.output = args[2];
	}

	if(args.length > 3){
		options.input = args[3];
	}

	fs.readFile(options.input,options, function (err, data) {
		if(err){
			throw err;
			return;
		}

		cmprss(options.compression,options.comments,data);
	});

	var endTime = process.hrtime(startTime);

	console.info("Compression time: %ds %dms", endTime[0], endTime[1]/1000000);
}

function help(){//displays both commands and settings
	console.log("\n \n \t \t \t CMPRSS.JS \n \t------------------------------------------ \n");
	
	commands();
	settings();
}

function settings(){//displays all possible settings
	console.log("\tList of Default Settings: \n");
	console.log("\tcompressed\t \t \t compresses with most compression \n");
	console.log("\tno\t \t \t \t no comments are preserved in the  \n \t \t \t \t \t writing of the new file\n");
	console.log("\tjs/scripts/*.js\t \t \t default input link location\n");
	console.log("\tjs/script.js\t \t \t default output link location\n");
	console.log("\tList of Settings: \n");
	console.log("\tcompressed\t \t \t compresses with most compression \n \t \t \t \t \t must be first setting\n");
	console.log("\tcompact\t \t \t \t compresses with some compression \n \t \t \t \t \t must be first setting\n");
	console.log("\tnone\t \t \t \t no compression, simply runs the  \n \t \t \t \t \t rewrite function, must be first setting\n");
	console.log("\tno\t \t \t \t no comments are preserved in the  \n \t \t \t \t \t writing of the new file, must be second setting\n");
	console.log("\tyes\t \t \t \t preserves comments in  \n \t \t \t \t \t writing of the new file, must be second setting\n");
	console.log("\tinput/link/files.js\t \t input link file location, must be third setting\n");
	console.log("\toutput/file.js\t \t \t output link location, must be fourth setting\n");
	console.log("\n");
}

function commands(){//displays all possible commands
	console.log("\tList of Commands: \n");
	console.log("\thelp | -help | -h | h \t \t Shows list of commands \n");
	console.log("\tsettings | -settings | -s | s \t Shows list of settings \n");
	console.log("\n");
}



//-----------------------------------------------------Action

checkArgv();
