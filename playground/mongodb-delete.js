// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to the Mongodb Server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // deleteMany
    db.collection('Todos').deleteMany({
        text: 'eat lunch'
    }).then((result) => {
        console.log(result);
    });

    // deleteOne
    db.collection('Todos').deleteOne({
        text: 'walk the dog'
    }).then((result) => {
        console.log(result);
    });

    // findOneAndDelete
    db.collection('Todos').findOneAndDelete({ completed: true })
        .then((result) => {
            console.log(result);
        });

    // delete duplicate users
    db.collection('Users').deleteMany({
        name: 'Andrew'
    });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5b0fd9b0e2b6873114ccdb7a')
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });
});
