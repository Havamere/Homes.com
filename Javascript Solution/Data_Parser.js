//This module is designed to import all the data and convert it to JSON objects, then export that data to the Data Worker
//It is currently using the Native File System (fs) and the Node Module xml2js

var export = module.exports = {};

//This simply imports the JSON data set to this file.
var dataJSON = require("../Homework Data/mls002/feed.json")
// console.log(dataJSON[1]);
// export dataJSON
export.function passJSON () {
  return dataJSON
}

//This section takes XML data and uses xml2js to create a JSON object.  It can be 2 levels deeper than the above JSON object/
var fs = require('fs');
var xml2js = require('xml2js');
var parseString = require('xml2js').parseString;

var dataXMLtoJSON
var dataXML2 = parseString(fs.readFileSync("../Homework Data/mls001/data.xml","utf-8"), { explicitArray : false, ignoreAttrs : true, trim: true}, function (err, result) {
  dataXMLtoJSON = result;
  // console.log(result.listings.listing[0]);
  return dataXMLtoJSON
});

export.function passXMLinJSON () {
  return dataXMLtoJSON
}

var dataCSVagents = csvJSON(fs.readFileSync("../Homework Data/mls003/agents.csv","utf-8").toString());
var dataCSVlistings = csvJSON(fs.readFileSync("../Homework Data/mls003/listings.csv","utf-8").toString());
var dataCSVoffices = csvJSON(fs.readFileSync("../Homework Data/mls003/offices.csv","utf-8").toString());
// console.log(dataCSV1);

var dataCSVtoJSON = {}

export.function passCSVinJSON () {
  return dataCSVtoJSON
}

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

// var dataXMLtry = xmlToJson(dataXMtryL);
// console.log(dataXMLtry);
//
// function xmlToJson(xml) {
//   // Create the return object
//   var obj = {};
//
//   if (xml.nodeType == 1) {
//     // element
//     // do attributes
//     if (xml.attributes.length > 0) {
//       obj["@attributes"] = {};
//       for (var j = 0; j < xml.attributes.length; j++) {
//         var attribute = xml.attributes.item(j);
//         obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
//       }
//     }
//   } else if (xml.nodeType == 3) {
//     // text
//     obj = xml.nodeValue;
//   }
//
//   // do children
//   // If all text nodes inside, get concatenated text from them.
//   var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
//     return node.nodeType === 3;
//   });
//   if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
//     obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
//       return text + node.nodeValue;
//     }, "");
//   } else if (xml.hasChildNodes()) {
//     for (var i = 0; i < xml.childNodes.length; i++) {
//       var item = xml.childNodes.item(i);
//       var nodeName = item.nodeName;
//       if (typeof obj[nodeName] == "undefined") {
//         obj[nodeName] = xmlToJson(item);
//       } else {
//         if (typeof obj[nodeName].push == "undefined") {
//           var old = obj[nodeName];
//           obj[nodeName] = [];
//           obj[nodeName].push(old);
//         }
//         obj[nodeName].push(xmlToJson(item));
//       }
//     }
//   }
//   return obj;
// }
