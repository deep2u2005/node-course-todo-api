// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to the Mongodb Server');
    }
    console.log('Connected to MongoDB server');

    //     const db = client.db('TodoApp');

    //     db.collection('Todos').insertOne({
    //         text: 'Something to do',
    //         completed: false
    //     }, (err, result) => {
    //         if (err) {
    //             return console.log('Unable to insert todo, err:', err);
    //         }
    //         console.log(JSON.stringify(result.ops, undefined, 2));
    //     });

    //     db.collection('Users').insertOne({
    //         name: 'Deep',
    //         age: 33,
    //         location: "Bangalore, india"
    //     }, (err, result) => {
    //         if (err) {
    //             return console.log('Unable to insert users, Error:', err);
    //         }
    //         console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    //     });
    client.close();
});
