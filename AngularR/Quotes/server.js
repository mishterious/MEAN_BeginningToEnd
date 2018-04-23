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
app.use(express.static(__dirname + "/theAuthorsApp/dist"));

// configure body-parser to read JSON
app.use(bodyParser.json());

//This is the Mongo and mongoose connection:
mongoose.connect('mongodb://localhost/author');

//The Schema along with the validation about how data is stored.
var AuthorSchema = new mongoose.Schema({
    name:  {
        type: String, 
        required: [true, "You need a location"],
        minlength: 1
        },
    messages: [{
        quote: {
            type: String, 
            required: [true, "You need a location"],
            minlength: 5
        },
        rank: {
            type: Number
        }
    }]
}, {timestamps: true });


// How to Retrieve the Schema and store it in the variable User
var Author = mongoose.model('Author', AuthorSchema);

//Promises are created to help stuff:
mongoose.Promise = global.Promise;

//All the Views and Logic 
app.get('/authors', function(req, res){
    Author.find({}, function(err, result){
        if(err){
            myerr = { error: "==== there is an error! ====="};
            console.log(err);
            res.json(err);
        }else{
            console.log(result);
            res.json(result);
        }
    });
});

app.get('/by/:id', function(req, res){
    console.log("INSIDE OF ID");
    Author.findOne({_id: req.params.id}, function(err, result){
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
    });
});


app.post('/create', function(req, res){
    console.log("----------------------------------------------")
    //Check out what we're getting from the HTMl Page:
    console.log("Post Data", req.body);

    var author = new Author();
    author.name = req.body.name; 
    console.log(author.name);
    console.log(req.body.name);

    author.save(function(err, result){
        console.log("are we here?")
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
    Author.findOne({_id: req.params.id}, function(err, author){
        author.name = req.body.name;
        author.save(function(err){
            if(err){
                console.log('==== there is an error! =====')
                console.log(err);
                res.json(err);
            }else{
                console.log('==== Edit this one  === ')
                console.log(author);
                console.log("were here");
                res.redirect('/');
            }
        });
    });
});


app.get('/quotesBy/:id', function(req, res){
    console.log(req.params.id);
    console.log("========WE'RE ADDING A QUOTE=======")
    Author.findOne({_id: req.params.id}, function(err, author){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log('==== Edit this one  === ')
            console.log(author);
            console.log("were here");
            res.json(author);
        }
    });
});


app.put('/addQuote/:id', function(req, res){

    var newQuote = req.body;
    console.log(newQuote);

    Author.update({_id: req.params.id}, { $push: {messages: { quote: newQuote.quote, rank: newQuote.rank }}}, function(err, author){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log('==== Edit this one  === ')
            console.log(author);
            console.log("were here");
            res.redirect('/');
        }
    });
})


app.put('/vote/:id', function(req, res){

    var newQuote = req.body;
    console.log("85748394857584934857548394857548398475483948")
    console.log(newQuote);

    Author.update({_id: req.params.id}, { $set: {messages: { quote: newQuote.quote, rank: newQuote.rank }}}, function(err, author){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log('==== Edit this one  === ')
            console.log(author);
            console.log("were here");
            res.redirect('/');
        }
    });
})

// app.put('/vote/:id', function(req, res){
//     console.log("03948579302-49587694034857")
//     var newQuote = req.body;
//     console.log (newQuote._id)
//     Author.update({_id: req.body._id }, { $set: { "messages.$.rank": newQuote.rank }}, function(err, author){
//         if(err){
//             console.log('==== there is an error! =====')
//             console.log(err);
//             res.json({ message: "not working", erros: err});
//         }else{
//             console.log('==== Edit this one  === ')
//             console.log(author);
//             console.log("were here");
//             res.redirect('/');
//         }
//     })
// });


app.delete('/delete/:id', function(req, res){
    console.log(req.params.id);
    Author.remove( {_id: req.params.id}, function(err, result){
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

app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./theAuthorsApp/dist/index.html'));
});

//Setting up the Server to listen to a partical port:
app.listen(8000, function() {
    console.log("listening on port 8000");
})