
var express = require("express");
var path = require("path");

var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');

app.use(session({secret: 'codingdojorocks'}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
    if('number' in req.session ){
        req.session.number += 1
    }
    else{
        req.session.number = 0
    } 
    
    context = {
        'number' : req.session.number 
    }
 res.render("index", context);
})
// post route for adding a user

// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});