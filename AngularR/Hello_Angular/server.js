//Require the following Modules:
var express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');

//Instantiate your Express application:
var app = express();

//bodyParser and Static must be connected to the server:
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, './static')));

//ANGULAR is being connected:
app.use(express.static(__dirname + "/myFirstAngularApp/dist"));

//Creating the file to store and connect with the html templates:
// app.set('views', path.join(__dirname, './client/views'));
// app.set('view engine', 'ejs');


// configure body-parser to read JSON
app.use(bodyParser.json());


//This is the Mongo and mongoose connection:
mongoose.connect('mongodb://localhost/hello_angular');


//The Schema along with the validation about how data is stored.
var PersonSchema = new mongoose.Schema({
    name:  {type: String, required: [true, "You need a name"], minlength: 1}
}, {timestamps: true });


// How to Retrieve the Schema and store it in the variable User
var Person = mongoose.model('Person', PersonSchema);


//Promises are created to help stuff:
mongoose.Promise = global.Promise;


//All the Views and Logic 
app.get('/', function(req, res){
    Task.find({}, function(err, result){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            res.json(result);
        }
    });
});


app.post('/create', function(req, res){
    console.log("----------------------------------------------")
    //Check out what we're getting from the HTMl Page:
    console.log("Post Data", req.body);

    //Now create a new User here, along with the information that is necessary *ESPECIALLY THE VALIDATION for inserting in the database!
    var task = new Task();
    task.title = req.body.title; 
    task.description = req.body.description; 
    task.completed = req.body.completed;
    console.log(task.title);
    console.log("========================3456789098765")
    console.log(req.body.title);
    //This is the method that will actually insert the 'user' into the database, the callback function is to inform us of mistakes
    task.save(function(err, result){
        console.log("are we here?")
        // if there is an error console.log that something went wrong!
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err)
        }else{
            console.log('==== Seeing all users successfully === ')
            console.log(result);
            res.json(result)
        }
    });
});


app.post('/update/:id', function(req,res){
    console.log(req.params.id);
    console.log("===============")
    Task.findOne({_id: req.params.id}, function(err, task){
        task.title = req.body.title;
        task.description = req.body.description;
        task.save(function(err){
            if(err){
                console.log('==== there is an error! =====')
                console.log(err);
                res.json('/');
            }else{
                console.log('==== Edit this one  === ')
                console.log(task);
                console.log("were here");
                res.redirect('/');
            }
        });
    });
});


app.post('/delete/:id', function(req, res){
    console.log(req.params.id);
    Task.remove( {_id: req.params.id}, function(err, result){
        // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log('==== Edit this one  === ')
            console.log(result);
            console.log("were here");
            res.json(result);
        }        
    })
});


//Setting up the Server to listen to a partical port:
app.listen(8000, function() {
    console.log("listening on port 8000");
})
