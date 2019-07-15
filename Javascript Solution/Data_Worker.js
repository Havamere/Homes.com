//This module is designed to import all the data and convert it to JSON objects, then export that data to the Data Worker
//It is currently using the Native File System (fs) and the Node Module xml2js
var data = require('./Data_Parser.js')
var exports = module.exports = {};

//This simply imports the JSON data set to this file.
var dataJSON = data.passJSON()
// console.log(dataJSON[1]);

//This section takes XML data and uses xml2js to create a JSON object.  It ends up being 2 levels deeper than the above JSON object/
var fs = require('fs');
var xml2js = require('xml2js');
var parseString = require('xml2js').parseString;

var dataXMLtoJSON = {}
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

  // console.log(dataXMLtoJSON);
  // console.log(result.listings.listing);
  return dataXMLtoJSON
});

exports.passXMLtoJSON = function() {
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

var dataCSVagentstoJSON = csvJSON(data.passCSVagents().toString());
exports.passCSVagentstoJSON = function() {
  return dataXML
}
var dataCSVlistingstoJSON = csvJSON(data.passCSVlistings().toString());
exports.passCSVlistingstoJSON = function() {
  return dataCSVlistingstoJSON
}
var dataCSVofficestoJSON = csvJSON(data.passCSVoffices().toString());
exports.passXML = function() {
  return dataCSVofficestoJSON
}
// console.log(dataCSV1);


//Initial code provided by github user iwek and their gihub page https://gist.github.com/iwek/7154578 titled: iwek/csv-to-json.js
//I have added to the code to make it more JSON friendly and more applicable to this program
//var csv is the CSV file with headers
function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].toLowerCase().replace(/(\r\n|\n|\r|\")/gm,"").split(",");
  // console.log(headers)

  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].replace(/(\r\n|\n|\r|\")/gm,"").split(",");
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }
  //return result; //JavaScript object
  return (result); //JSON
}

//All data at this point should be in similar style JSON objects.
