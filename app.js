const fs = require('fs');
const path = require('path');
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// mongoose connection
mongoose.connect('mongodb://localhost:27017/v2todomvc');
var db = mongoose.connection;
console.log(db);
const Todo = require('./models/todo.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var todo = new Todo ({
//       title: "gonna turn in this todo, todo",
//       completed: false
//    });
//
// todo.save(function(err) {
//   if (err) {
//     throw err;
//   }
//   console.log('todo created!');
// }).then(function(todo) {
//    console.log(todo);
// });

app.use('/static', express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
})

// put routes here

// GET /api/todos/ - return a JSON array of todo items
app.get('/api/todos', function(req, res) {
   Todo.find({}, function(err, todos) {
      if(err) {
         res.send(err);
      }
      res.json(todos);
   })
})

// POST /api/todos/ - post a JSON representation of a todo and have it saved. Returns the saved todo item in JSON.
app.post('/api/todos', function (req, res) {
   var todo = new Todo ({
      title: req.body.title,
      completed: false
   });
   todo.save(function(err, todo) {
     if (err) {
       throw err;
     }
     console.log('todo created!');
     res.json(todo);
   })
})

// GET /api/todos[/id] - get a specific todo item.
app.get('/api/todos/:id', function(req, res) {
   Todo.findOne({ _id: req.params.id}, function(err, todo) {
      if(err) {
         res.send(err);
      }
      res.json(todo);
   })

})

// DON'T KNOW ABOUT THIS ONE
// PUT /api/todos[/id] - update a todo item. Returns the modified todo item.
app.put('/api/todos/:id', function(req, res) {
   Todo.findOne({ _id: req.params.id }, function(err, todo) {
      if (err) {
         res.send(err);
      }
      return todo
   }).then(function(todo) {
      todo = req.body
   })
   todo.save().then(function(todo) {
      res.json(todo)
   })
// Todo.updateOne({ _id: req.params.id}, function(err, todo) {
//    if(err) {
//       res.send(err);
//    }
//    todo.save()
//    .then(function(todo) {
//       res.json(todo)
//    })
// })
})

// PATCH /api/todos[/id] - partially update a todo item. Returns the modified todo item.
app.patch('/api/todos/:id', function(req, res) {

})

// DELETE /api/todos[/id] - deletes a todo item. Returns the todo item that was deleted.
app.delete('/api/todos/:id', function (req, res) {

})















app.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});
