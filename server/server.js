
var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Todo } = require('./models/todo');

const port = 3000;

var app = express();

app.use(bodyParser.json());

// GET/todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }, (err) => {
        res.status(400).send(err);
    });
});

// GET/todos/{id}
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((err) => {
        res.status(400).send();
    });
});

// POST/todos
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

// GET/users
app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send({
            users
        });
    }, (err) => {
        res.status(400).send(err);
    });
});

// GET/users/{id}
app.get('/users/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    User.findById(id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send({ user });
    }).catch((err) => {
        res.status(400).send();
    });
});

// POST/users
app.post('/users', (req, res) => {
    var user = new User({
        Name: req.body.Name,
        Age: req.body.Age,
        Address: req.body.Address,
        Email: req.body.Email,
        isActive: req.body.isActive
    });
    user.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.listen(port), () => {
    console.log('Started on port: ', port);
};
