//Require the following Modules:
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

//bodyParser and Static must be connected to the server:
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, './static')));

//Creating the file to store and connect with the html templates:
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//This is the Mongo and mongoose connection:
mongoose.connect('mongodb://localhost/mongoosedb_dashboard');

//The Schema along with the validation about how data is stored.
var AnimalSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 3},
    strength: { type: Number, required: true },
    height: {type: String, required: true},
    weight: {type: String, required: true},
    alpha: { type: String, required: true }
}, {timestamps: true });

// How to Retrieve the Schema and store it in the variable User
var Animal = mongoose.model('Animal', AnimalSchema);

//Promises are created to help stuff:
mongoose.Promise = global.Promise;


app.get('/', function(req, res){
    Animal.find({}, function(err, result){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.redirect('index');
        }else{
            res.render('index', {animal:result});
        }
    });
});


app.get('/new', function(req, res){
    res.render('new');
});


app.post('/animal/new', function(req, res){
    console.log("----------------------------------------------")
    //Check out what we're getting from the HTMl Page:
    console.log("Post Data", req.body);

    //Now create a new User here, along with the information that is necessary *ESPECIALLY THE VALIDATION for inserting in the database!
    var animal = new Animal({name: req.body.name, strength: req.body.strength, height: req.body.height, weight: req.body.weight, alpha: req.body.alpha})

    //This is the method that will actually insert the 'user' into the database, the callback function is to inform us of mistakes
    animal.save(function(err, results){
        console.log("are we here?")
        // if there is an error console.log that something went wrong!
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.redirect('/')
        }else{
            console.log('==== Seeing all users successfully === ')
            console.log(results);
            res.redirect('/all')
        }
    });
});


app.get('/edit/:id', function(req,res){
    console.log(req.params.id);
    console.log("===============")
    Animal.find({_id: req.params.id}, function(err, result){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.redirect('/');
        }else{
            console.log('==== Edit this one  === ')
            console.log(result);
            console.log("were here");
            res.render('edit', {animal:result});
        }
    });
});


app.post('/update/:id', function(req, res){
    console.log(req.params.id);
    console.log("+==========================+")
    Animal.findOne({_id: req.params.id}, function(err, result){
        result.strength = req.body.strength;
        result.height = req.body.height; 
        result.weight = req.body.weight;
        result.alpha = req.body.alpha;
        result.save(function(err){
            if(err){
                console.log('There is');
                console.log(err);
            }else{
                console.log("success");
                res.redirect('/');
            }
        });
    });
});

app.get('/all', function(req, res){
    Animal.find({}, function(err, result){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.redirect('/');
        }else{
            // console.log(result);
            res.render('index', {animal:result});
        }
    });
})


app.post('/delete/:id', function(req, res){
    console.log(req.params.id);
    Animal.remove( {_id: req.params.id}, function(err){
        // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
        console.log('almost there');
        res.redirect('/');
    })
});


//Setting up the Server to listen to a partical port:
app.listen(8000, function() {
    console.log("listening on port 8000");
})