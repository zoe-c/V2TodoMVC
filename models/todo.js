const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const todoSchema = new mongoose.Schema({
   title: String,
   completed: false
});


const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
