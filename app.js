var express = require("express");
var https = require("https");
var path = require("path");

var app = express();

app.use(express.static("public")); //indicates the directory for static items e.g css

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});


app.listen(3000, function(){
    console.log('server is running on port 3k');
})