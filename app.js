const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})


app.post("/", function (req, res) {
    var firstName = req.body.Fname;
    var lastName = req.body.Lname;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                FNAME: firstName,
                LNAME: lastName
                        }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    
    var options = {
        url: "https://us18.api.mailchimp.com/3.0/lists/c88db03b06",
        method: "POST",
        headers: {
            "Authorization": "TamarahOrubebe 935449bd6aa706bc61469d58f82eff22-us18"
        },
        body: jsonData
		};


    request(options, function (error, response, body) {
        if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
        } else if (response.statusCode !== 200) {
            res.sendFile(__dirname + "/failure.html");
        } else if (error) { 
            res.sendFile(__dirname + "/failure.html");
        } else {
            console.log(response.statusCode);
        }
    });

});

app.post("/failure", function (req, res) {
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function () {
    console.log("server is runing on port 3000");
});

// API Key
// 935449bd6aa706bc61469d58f82eff22-us18

// List id
// c88db03b06;