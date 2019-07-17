//This module is designed to import all the data and convert it to JSON objects, then export that data to the Data Worker
//It is currently using the Native File System (fs) and the Node Module xml2js
var data = require('./Data_Parser.js')
var exports = module.exports = {};

//This simply imports the JSON data set to this file.
var dataJSON = data.passJSON()

exports.passJSONdata = function() {
  return dataJSON
}
// console.log(dataJSON[1]);


//This section takes XML data and uses xml2js to create a JSON object.  It ends up being 2 levels deeper than the above JSON object/
var fs = require('fs');
var xml2js = require('xml2js');
var parseString = require('xml2js').parseString;

var dataXMLtoJSON = []
var dataXML2 = parseString(data.passXML(), { explicitArray : false, ignoreAttrs : true, trim: true}, function (err, result) {
  deepDataXMLtoJSON = result.listings.listing
  for (var key in deepDataXMLtoJSON) {
    var obj = deepDataXMLtoJSON[key];
    if ((typeof obj) == 'object' ) {
      dataXMLtoJSON[key] = flattenObject(obj);
    } else {
      dataXMLtoJSON[key] = obj;
    }
  }

  // console.log(result.listings.listing);
  return dataXMLtoJSON
});

// console.log(dataXMLtoJSON);


exports.passXMLtoJSONdata = function() {
  return dataXMLtoJSON
}
//Initial code provided by github user Will Rayner and their gihub page https://gist.github.com/penguinboy/762197 titled: https://gist.github.com/penguinboy/762197
function flattenObject(obj) {
	var replacerObj = {};

	for (var i in obj) {
		if (!obj.hasOwnProperty(i)) continue;

		if ((typeof obj[i]) == 'object') {
			var flatObject = flattenObject(obj[i]);
			for (var x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) continue;

				replacerObj[i + '_' + x] = flatObject[x];
			}
		} else {
			replacerObj[i] = obj[i];
		}
	}
	return replacerObj;
};

var dataCSVagentstoJSON = csvJSON(data.passCSVagents().toString(), "agent");
exports.passCSVagentstoJSONdata = function() {
  return dataCSVagentstoJSON
}
var dataCSVlistingstoJSON = csvJSON(data.passCSVlistings().toString(), "listing");
exports.passCSVlistingstoJSONdata = function() {
  return dataCSVlistingstoJSON
}
var dataCSVofficestoJSON = csvJSON(data.passCSVoffices().toString(), 'office');
exports.passCSVofficestoJSONdata = function() {
  return dataCSVofficestoJSON
}
// console.log(dataCSVagentstoJSON);
// console.log(dataCSVlistingstoJSON);
// console.log(dataCSVofficestoJSON);


//Initial code provided by github user iwek and their gihub page https://gist.github.com/iwek/7154578 titled: iwek/csv-to-json.js
//I have added to the code to make it more JSON friendly and more applicable to this program
//var csv is the CSV file with headers
function csvJSON(csv,title){

  var lines=csv.split("\r");
  var result = [];
  var headers=lines[0].toLowerCase().replace(/(\r\n|\n|\r|\")/gm,"").split(",");

  for (var i=0; i < headers.length; i++) {
    if (headers[i] == 'name' || headers[i] == 'phone' || headers[i] == "city"|| headers[i] == "state"|| headers[i] == "zip") {
      headers[i] = title+"_"+headers[i];
    }
  }
  // console.log(lines);

  for (var i=1; i<lines.length-1; i++) { //-1 is a hack until if statement works properly
	  var obj = {};
	  var currentLine = lines[i].replace(/(\r\n|\n|\r|\")/gm,"").split(",");

    // console.log(currentLine);
	  for(var j=0; j<headers.length; j++){
      // if (currentLine[j] == 'desc' && currentLine[j] == '')
		  obj[headers[j]] = currentLine[j];
	  }
	  result.push(obj);
  }
  //return result; //JavaScript object
  return (result); //JSON
}

//All data at this point should be in similar style JSON objects.
