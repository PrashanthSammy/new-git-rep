//jshint esversion: 8

//requiring the modules
const express = require("express");
const request = require("request");
const bodyparser = require("body-parser");
const https = require("https");

//running the app
const app = express();

//using the express and bodyparser modules
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

//sending the html file to the home route
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

//handling posted data
app.post("/", function (req, res) {
  //storing the inputs to variables
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  //logging the inputs
  // console.log(firstName, lastName, email);

  //we should create an object in order to send the data

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  //we are using https request module in order to use the psot method
  //find the api end point from mailchimp and assign it to the url variable


const url = "https://us4.api.mailchimp.com/3.0/lists/2baf8f202f"
  
const options = {
  method: "POST",
  auth: "sammy043:faaa7d706beaf315cc7903df76efdc05-us4"
}
 const request = https.request(url,options , function(response){


  if (response.statusCode === 200) {
    res.redirect("success")
  } else {
    res.redirect("failure")
  }

  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
 })

 request.write(jsonData);
 request.end();

});

//posting data to mailchimp through api


//new routes
app.get("/success", function(req, res){
  res.sendFile(__dirname + "/success.html")
})

app.get("/failure", function(req, res){
  res.sendFile(__dirname + "/failure.html")
})


app.post("/failure", function(req, res){
  res.redirect("/")
})
//setting the port on 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("The server has started on port 3000");
});


// api key
// faaa7d706beaf315cc7903df76efdc05-us4
// list id
// 2baf8f202f

//api
//https://us8.api.mailchimp.com/3.0/lists/7642bf9b8b
