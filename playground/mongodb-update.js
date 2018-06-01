// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to the Mongodb Server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5b0fd998e0500e47c0fb53e0')
    }, {
            $set: {
                completed: true
            }
        }, {
            returnOriginal: false
        })
        .then((result) => {
            console.log(result);
        });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b0fd998e0500e47c0fb53e1')
    }, {
            $set: {
                name: 'Jane'
            }
            ,
            $inc: {
                age: 1
            }
        }
        ,
        {
            returnOriginal: false
        })
        .then((result) => {
            console.log(result);
        });
});

