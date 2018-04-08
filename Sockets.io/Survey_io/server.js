
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

app.post('/users', function (req, res){
    console.log("POST DATA \n\n", req.body)
    req.session.name = req.body.name
    req.session.location = req.body.location
    req.session.language = req.body.language
    req.session.comments = req.body.comments
    // if('comment' in req.body)

    context = {
        'name' : req.body.name,
        'location' : req.body.location,
        'language' : req.body.language,
        'comments' : req.body.comments
    }
    //code to add user to db goes here!
    // redirect the user back to the root route.  
    res.render('result', context)
});


// tell the express app to listen on port 8000
var server = app.listen(8000, function() {
    console.log("listening on port 8000");
   });
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);

    socket.on( "posting_form", function (data){
        // var myJSON = JSON.stringify(data);
        var msg = 'You emitted the following bla bla bla : { ';
        for(var i=0; i < data.length; i++){
            msg += data[i].name + ": " +  data[i].value + ", ";
            console.log("---------------------------------")
            console.log( 'Someone clicked a button!  Reason: '  + data[i].value);
            if (i === data.length-1){
                msg += " } Your lucky number emitted by the server is "+ (Math.floor(Math.random()*1000 )+1);
            
            }
        }
        console.log(msg);
        console.log( 'Someone clicked a button!  Reason: '  + msg);
        socket.emit( 'server_response', msg);
    })    
})