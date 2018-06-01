const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
const {ObjectId} = require('mongodb');



var id = '5b1105f18e8eb52e583115a411';


if(!ObjectId.isValid(id)){
   return console.log('id not valid');
}

Todo.find({
    _id: id
}).then((todos) => {
    if(!todos){
        return console.log('Todos: id not found');
    }
    console.log('Todos: ', todos);
}).catch((err)=>console.log(err));;

Todo.findOne({
    _id: id
}).then((todo) => {
    if(!todo){
        return console.log('Todo: id not found');
    }
    console.log('\nTodo: ', todo);
}).catch((err)=>console.log(err));;

Todo.findById(id).then((todo) => {
    if(!todo){
        return console.log('Todo by Id: id not found');
    }
    console.log('\nTodo by Id: ', todo);
}).catch((err)=>console.log(err));

