const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
   title: String,
   completed: false
});


const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
