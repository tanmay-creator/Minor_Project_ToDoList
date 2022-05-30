const express = require('express');
const path = require('path');
const db = require('./config/mongoose');
const Task = require('./models/ToDoTask');
const alert  = require('alert');

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
    
    //fetching all the data from database then render to home.ejs
    Task.find({},(err,allTasks)=>{
        if(err)
        {
            return console.log("err occured");
        }

        return res.render('home', {allTask:allTasks});
    })
    
})

//route for save task
app.post('/save-task', function(req,res){

    //get the required data from UI and save it to database
    Task.create({
        title:req.body.title,
        description: req.body.description,
        endDate: req.body.date
    }, (err, newTask)=>{
        if(err){
            return console.log(err);
        }
    })
    return res.redirect('back');
})

//route for delete task
app.get('/delete-task', function(req,res){
    //get the required id then search for this id in database then delete
    Task.remove({_id:req.query.id}, (err, deletedTask)=>{
        if(err){
            return console.log("error in deleting");
        }

        res.redirect('/')
    })
})
app.listen(PORT, function(err){
    if(err){
        console.log("Error in starting server");
        return;
    }

    console.log("server started successfully");
})