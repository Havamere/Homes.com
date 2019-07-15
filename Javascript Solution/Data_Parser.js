//This module is designed to import all the data, then export that data to the Data Worker

var exports = module.exports = {};

var dataJSON = require("../Homework Data/mls002/feed.json");

exports.passJSON = function() {
  return dataJSON
}

//node can't read xml, so this changes the format to something node can read, like a standard typed file
var fs = require('fs');

var dataXML = fs.readFileSync("../Homework Data/mls001/data.xml","utf-8");

exports.passXML = function() {
  return dataXML
}

//node also doesn't natively read csv files well either, to it is being translated to a standard typed file
var dataCSVagents = fs.readFileSync("../Homework Data/mls003/agents.csv");

exports.passCSVagents = function() {
  return dataCSVagents
}

var dataCSVlistings = fs.readFileSync("../Homework Data/mls003/listings.csv");

exports.passCSVlistings = function() {
  return dataCSVlistings
}

var dataCSVoffices = fs.readFileSync("../Homework Data/mls003/offices.csv");

exports.passCSVoffices = function() {
  return dataCSVoffices
}

//All data has been imported and made available for export.
