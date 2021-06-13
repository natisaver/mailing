var express = require("express");
var https = require("https");
var path = require("path");

var app = express();

app.use(express.static("public")); //indicates the directory for static items e.g css
app.use(express.json()); //json
app.use(express.urlencoded());


app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    console.log(email);
    console.log(firstName);


    //mail chimp data contains members object which contains an array, and within that an object with the diff body parameters.
    var data = {
        members:[ {
            email_address: email,
            status: "subscribed",
            merge_fields: {
            FNAME: firstName,
            LNAME: lastName
            }
        }]
        };
        
//stringify() method converts a JavaScript object or value to a JSON string
    var jsonData = JSON.stringify(data);
    const url = "https://us1.api.mailchimp.com/3.0/lists/43c1e261ba"
    const options = {
        method: "POST",
        body: data,
        auth: "nat:9ee2d76c1ab86533ae23608ef12f3c8f-us1"
    }

    //https://nodejs.org/api/https.html#https_https_request_url_options_callback
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
          } else {
            res.sendFile(__dirname+"/failure.html");
          }
      
    });


    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log('server is running on port 3k');
})

// api key: 9ee2d76c1ab86533ae23608ef12f3c8f-us1 (account->extras->API Keys)
// audience id: 43c1e261ba (dashboard->audience->settings->audience name/defaults)

//post get put delete
//create read update delete
