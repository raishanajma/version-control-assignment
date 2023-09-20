/*
Created by a student
ISTE 422: Exercise 2: Improvised ETL
Date: 2/5/2016
Software used: Nodejs (No extra dependencies)
Why?: The reason I used nodejs is because we are dealing
with a json data format and nodejs is built to handle
that natively without any external plugins
*/

//Node JS dependencies for reading and writing files to the file system.
var fs = require('fs');
//Read the file from the file system
var obj = JSON.parse(fs.readFileSync('./data.json','utf8'));
//get the date from the first item.
var date = new Date(obj[0].timestamp);
//format the date to the YYYYMMDD.csv required for the submission.
var datef = date.getFullYear() + pad2(date.getMonth()+1) + pad2(date.getDate());
//to return string object
var csv = ""
//for loop to parse all items
for(var i = 0; i < obj.length; i++){
  //item is a single person
  var item = obj[i];
  //check if item has a creditcard and email then save the :name and :creditcard and :email to the csv object in the csv format
  if(item.email != null && item.creditcard != null){
    csv += item.name + "," + item.email + "," + item.creditcard + "\n";
  }
}

//store the compiled csv in a file formated YYYYMMDD.csv
fs.writeFile("./" + datef + ".csv", csv, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

//formating function for manking numbebers 2 digits ex "2" -> "02"
function pad2(number) {
     return (number < 10 ? '0' : '') + number
}