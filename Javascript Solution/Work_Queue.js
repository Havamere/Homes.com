var sqlite3 = require('sqlite3').verbose();
var parsedData = require("./Data_Worker.js");

var dataJSONonly = parsedData.passJSONdata();
var dataXMLtoJSON = parsedData.passXMLtoJSONdata();
var dataCSVagentstoJSON = parsedData.passCSVagentstoJSONdata();
var dataCSVlistingstoJSON = parsedData.passCSVlistingstoJSONdata();
var dataCSVofficestoJSON = parsedData.passCSVofficestoJSONdata();

// console.log(dataCSVagentstoJSON);

var sqlCSVagentData = [];

var massiveJSON = dataJSONonly.concat(dataXMLtoJSON, dataCSVagentstoJSON, dataCSVlistingstoJSON, dataCSVofficestoJSON);

//Open Database Connection
// var db = new sqlite3.Database("../../homes.com/homes.db", sqlite3.OPEN_READWRITE, function (err){
//   if (err) {
//     console.log(err.message);
//   }
//   console.log("Connected to the Homes.com database")
// })

function agentSQLarray(array) {
  var tempArray = []
  var innerArray = []
  for (var i = 0; i<array.length; i++) {
    // console.log(array[i])
    for (var key in array[i]) {
      // console.log(array[i][key])
      innerArray.push(array[i][key])
    }
    tempArray.push(innerArray)
  }
  // console.log(tempArray)
  return tempArray
}
sqlCSVagentData = agentSQLarray(dataCSVagentstoJSON)
console.log(sqlCSVagentData);

function homeSQLinsert(obj) {
  var valueArray = [];
  for (var i = 0; i < obj.length; i++) {
    if (obj[i] == "mls_number" || obj[i] == "street_address" || obj[i] == "address_street" || obj[i] == "zip" || obj[i] == "address_zip" || obj[i] == "city" || obj[i] == "address_city" || obj[i] == "state" || obj[i] == "address_state" || obj[i] == "price" || obj[i] == "status" || obj[i] == "type" || obj[i] == "agent_code" || obj[i] == "office_code" || obj[i] == "desc" ) {

    }
  }
}

function officeSQLinsert(obj) {
  var valueArray = [];
  for (var i = 0; i < obj.length; i++) {
    if (obj[i] == "office_code" || obj[i] == "office_name" || obj[i] == "office_phone" || obj[i] == "office_city" || obj[i] == "office_state" || obj[i] == "office_zip" || obj[i] == "broker_code" || obj[i] == "broker_phone" || obj[i] == "broker_name") {

    }
  }
}
var jsonSQL = '';
var agentSQL = 'INSERT INTO Agent(agent_name, agent_code, office_code, agent_phone, agent_city, agent_state, agent_zip) VALUES ('+  +')'
var homeSQL = 'INSERT INTO Home(mls_number, address, city, state, zip, price, status, type, agent_code, office_code, description)'
var officeSQL = 'INSERT INTO Office(office_code, office_name, office_phone, office_city, office_state, office_zip)'

// db.run(agentSQL, , function(err) {
//   if (err) {
//     console.log(err.message);
//   }
//
//   console.log('Rows inserted '+)
// });

// close the database connection
// db.close(function(err) {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });


// console.log(massiveJSON);
//
// function agentSQLbinder(array) {
//   var valueArray = [];
//   var tempObj = {
//     "agent_code":"",
//     "agent_name":"",
//     "office_code":"",
//     "agent_phone":"",
//     "agent_city":"",
//     "agent_state":"",
//     "agent_zip":"",
//   }
//   array.forEach(function(arrayItem) {
//     var obj = arrayItem;
//     // console.log(obj);
//     for (var key in obj) {
//       // console.log(key);
//       if (obj.hasOwnProperty(key) && (key == "agent_code")) {
//         tempObj[key] = obj[key];
//       }
//       if (obj.hasOwnProperty(key) && (key == "agent_name")) {
//         tempObj[key] = obj[key];
//       }
//       if (obj.hasOwnProperty(key) && (key == "office_code")) {
//         tempObj[key] = obj[key];
//       }
//       if (obj.hasOwnProperty(key) && (key == "agent_phone")) {
//         tempObj[key] = obj[key];
//       }
//       if (obj.hasOwnProperty(key) && (key == "agent_city")) {
//         tempObj[key] = obj[key];
//       }
//       if (obj.hasOwnProperty(key) && (key == "agent_state")) {
//         tempObj[key] = obj[key];
//       }
//       if (obj.hasOwnProperty(key) && (key == "agent_zip" )) {
//         tempObj[key] = obj[key];
//       }
//       return tempObj;
//     }
//     valueArray.push(tempObj);
//
//     console.log("tempObj = "+tempObj);
//   })
//   // console.log("valueArray = "+valueArray);
//
//   return valueArray;
// }
//
// var agentSQLinsert = agentSQLbinder(massiveJSON);
// console.log(agentSQLinsert);
