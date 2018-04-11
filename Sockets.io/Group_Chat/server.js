
var express = require("express");
var path = require("path");

var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');

var msgs = [];

app.use(session({secret: 'codingdojorocks'}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
    res.render("index", {msgs: msgs});
})

// tell the express app to listen on port 8000
var server = app.listen(8000, function() {
    console.log("listening on port 8000");
    });

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    console.log("Client/socket is id is: ", socket.id);

    socket.on("on_user", function(data){
        console.log(data);
        msgs.push(data)
        io.emit("server_response", {data: data});
    });
});