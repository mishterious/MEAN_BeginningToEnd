//Require the following Modules:
var express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');

//Instantiate your Express application:
var app = express();

//BodyParser and Static must be connected to the server:
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, './static')));

//ANGULAR is being connected:
app.use(express.static(__dirname + "/theWeatherApp/dist"));

// configure body-parser to read JSON
app.use(bodyParser.json());

//This is the Mongo and mongoose connection:
mongoose.connect('mongodb://localhost/weather');

//The Schema along with the validation about how data is stored.
var WeatherSchema = new mongoose.Schema({
    location:  {type: String, required: [true, "You need a location"], minlength: 1}
}, {timestamps: true });


// How to Retrieve the Schema and store it in the variable User
var Weather = mongoose.model('Weather', WeatherSchema);

//Promises are created to help stuff:
mongoose.Promise = global.Promise;

//All the Views and Logic 
// app.get('/weather', function(req, res){
//     Weather.find({}, function(err, weather){
//         if(err){
//             console.log('==== there is an error! =====')
//             console.log(err);
//             res.json(err);
//         }else{
//             console.log(weather);
//             res.json(weather);
//         }
//     });
// });

app.get('/by/:id', function(req, res){
    console.log("INSIDE OF ID");
    Weather.findOne({_id: req.params.id}, function(err, weather){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log('==== Edit this one  === ')
            console.log(weather);
            console.log("were here");
            res.json(weather);
        }
    });
});


app.post('/create', function(req, res){
    console.log("----------------------------------------------")
    //Check out what we're getting from the HTMl Page:
    console.log("Post Data", req.body);

    var weather = new Weather();
    weather.title = req.body.title; 
    weather.description = req.body.description; 
    weather.completed = req.body.completed;
    console.log(weather.title);
    console.log("========================3456789098765")
    console.log(req.body.title);

    weather.save(function(err, result){
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


app.post('/edit/:id', function(req,res){
    console.log(req.params.id);
    console.log("===============")
    Weather.findOne({_id: req.params.id}, function(err, weather){
        weather.title = req.body.title;
        weather.description = req.body.description;
        weather.save(function(err){
            if(err){
                console.log('==== there is an error! =====')
                console.log(err);
                res.json(err);
            }else{
                console.log('==== Edit this one  === ')
                console.log(weather);
                console.log("were here");
                res.redirect('/');
            }
        });
    });
});


app.delete('/delete/:id', function(req, res){
    console.log(req.params.id);
    Weather.remove( {_id: req.params.id}, function(err, result){
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