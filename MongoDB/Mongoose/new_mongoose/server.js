// Require the Express Module
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');

var UserSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number}
}, {timestamps: true})

var UserSchema = new mongoose.Schema({
    first_name:  { type: String, required: true, minlength: 6},
    last_name: { type: String, required: true, maxlength: 20 },
    age: { type: Number, min: 1, max: 150 },
    email: { type: String, required: true }
}, {timestamps: true });

// Store the Schema under the name 'User'
mongoose.model('User', UserSchema);
// Retrieve the Schema called 'User' and store it to the variable User
var User = mongoose.model('User');

mongoose.Promise = global.Promise;
// Routes
// Root Request
app.get('/', function(req, res) {
    User.find({}, function(err, users) {
    // Retrieve an array of users
    // This code will run when the DB is done attempting to retrieve all matching records to {}
    })
       
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    res.render('index');
})
// Add User Request 
app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);
    // create a new User with the name and age corresponding to those from req.body
    var user = new User({name: req.body.name, age: req.body.age});
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    user.save(function(err) {
        // if there is an error console.log that something went wrong!
        if(err) {
        console.log('something went wrong');
        } else { 
        // else console.log that we did well and then redirect to the root route
        console.log('successfully added a user!');
        res.redirect('/');
        }
    });
});
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})