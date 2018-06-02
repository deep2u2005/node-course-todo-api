const _ = require('lodash');

var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Todo } = require('./models/todo');

const port = process.env.PORT || 3000;

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

// PATCH/todos/:id
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getDate();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((err) => {
        res.status(400).send();
    });
});

// DELETE/todos/{id}
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        res.status(200).send(todo);
    }).catch(() => {
        return res.status(404).send(res.body);
    })
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
// app.post('/users', (req, res) => {
//     var user = new User({
//         Name: req.body.Name,
//         Age: req.body.Age,
//         Address: req.body.Address,
//         Email: req.body.Email,
//         isActive: req.body.isActive
//     });
//     user.save().then((doc) => {
//         res.send(doc);
//     }, (err) => {
//         res.status(400).send(err);
//     });
// });

// POST/users 
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['Email', 'Password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// DELETE/users/{id}
app.delete('/users/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    User.findByIdAndRemove(id).then((user) => {
        res.status(200).send(user);
    }).catch(() => {
        return res.status(404).send(res.body);
    })
});

// PATCH/users/{id}
app.patch('/users/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['Name', 'Age', 'Address', 'isActive', 'Email']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    User.findByIdAndUpdate(id, { $set: body }, { new: true }).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send({ user });
    }).catch((err) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log('Started listening on port: ', port);
});
