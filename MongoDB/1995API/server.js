//Require the following Modules:
var express = require('express');
var app = express();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var path = require('path');


//bodyParser and Static must be connected to the server:
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, './static')));

//Creating the file to store and connect with the html templates:
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');



// configure body-parser to read JSON
app.use(bodyParser.json());

//This is the Mongo and mongoose connection:
mongoose.connect('mongodb://localhost/mongoosedb_dashboard');


//The Schema along with the validation about how data is stored.
var PeopleSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 3},
}, {timestamps: true });

// How to Retrieve the Schema and store it in the variable User
var People = mongoose.model('People', PeopleSchema);

//Promises are created to help stuff:
mongoose.Promise = global.Promise;


//All the Views and Logic 
app.get('/', function(req, res){
    People.find({}, function(err, result){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.redirect('index');
        }else{
            res.render('index', {people:result});
        }
    });
});


app.post('/people/add', function(req, res){
    console.log("----------------------------------------------")
    //Check out what we're getting from the HTMl Page:
    console.log("Post Data", req.body);

    //Now create a new User here, along with the information that is necessary *ESPECIALLY THE VALIDATION for inserting in the database!
    var people = new People({name: req.body.name})

    //This is the method that will actually insert the 'user' into the database, the callback function is to inform us of mistakes
    people.save(function(err, results){
        console.log("are we here?")
        // if there is an error console.log that something went wrong!
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.redirect('/')
        }else{
            console.log('==== Seeing all users successfully === ')
            console.log(results);
            res.redirect('/')
        }
    });
});


app.get('/edit/:id', function(req,res){
    console.log(req.params.id);
    console.log("===============")
    People.findOne({_id: req.params.id}, function(err, result){
        result.name = "Plato";
        result.save(function(err){
            if(err){
                console.log('==== there is an error! =====')
                console.log(err);
                res.redirect('/');
            }else{
                console.log('==== Edit this one  === ')
                console.log(result);
                console.log("were here");
                res.redirect('/');
            }
        });
    });
});


app.post('/delete/:id', function(req, res){
    console.log(req.params.id);
    People.remove( {_id: req.params.id}, function(err){
        // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
        console.log('almost there');
        res.redirect('/');
    })
});


//Setting up the Server to listen to a partical port:
app.listen(8000, function() {
    console.log("listening on port 8000");
})