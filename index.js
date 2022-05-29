const express = require('express');
const path = require('path');
const db = require('./config/mongoose');
const Task = require('./models/ToDoTask');

const app = express();
const PORT = 3000;

//To set up ejs view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

// It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded());

//To set static folder to use css, js, images
app.use(express.static('./assets'))

//route for home
app.get('/', function(req,res){
    return res.render('home');
})

//route for save task
app.post('/save-task', function(req,res){

    Task.create({
        title:req.body.title,
        description: req.body.description,
        endDate: req.body.date
    }, (err, newTask)=>{
        if(err){
            return console.log(err);
        }
    })
})
app.listen(PORT, function(err){
    if(err){
        console.log("Error in starting server");
        return;
    }

    console.log("server started successfully");
})