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
mongoose.connect('mongodb://localhost/basic_mongoose');

//The Schema along with the validation about how data is stored.
var UserSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 3},
    quote: { type: String, required: true },
}, {timestamps: true });

// How to Retrieve the Schema and store it in the variable User
var User = mongoose.model('User', UserSchema);

//Promises are created to help stuff:
mongoose.Promise = global.Promise;

app.get('/', function(req, res){
    res.render('index');
})

// Taking us to the first page, along with any required database info:
// app.get('/', function(req, res){
// //     //Calling something from the database, based on the retriveal function we pre-set:
//     User.find({}, function(req, res){
//         if(err){
//             console.log('==== there is an error! =====')
//             console.log(err);
//             res.redirect('/');
//         }else{
//             console.log('==== Seeing all users successfully === ')
//             console.log(results);
//             res.redirect('/');
//         }
//     });
// });

//How post to the database and decide where the page goes to:
app.post('/user/add', function(req, res){
    console.log("----------------------------------------------")
    //Check out what we're getting from the HTMl Page:
    console.log("Post Data", req.body);
    console.log(req.body.name);
    console.log(req.body.quote);

    //Now create a new User here, along with the information that is necessary *ESPECIALLY THE VALIDATION for inserting in the database!
    var user = new User({name: req.body.name, quote: req.body.quote})

    //This is the method that will actually insert the 'user' into the database, the callback function is to inform us of mistakes
    user.save(function(err, results){
        console.log("are we here?")
        // if there is an error console.log that something went wrong!
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.redirect('/')
        }else{
            // console.log('==== Seeing all users successfully === ')
            console.log(results);
            res.redirect('/all')
        }
    });
});


app.get('/all', function(req, res){
    User.find({}, function(err, result){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.redirect('/');
        }else{
            console.log('==== Seeing all users successfully === ')
            console.log(result);
            res.render('quotes', {result:result});
        }
    });
})

//Setting up the Server to listen to a partical port:
app.listen(8000, function() {
    console.log("listening on port 8000");
})