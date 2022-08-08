// Express
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// MongoDB
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'todoapp';

MongoClient.connect(url, { useNewUrlParser: true })
    .then((client) => {
        // DB Setup
        const db = client.db(dbName);
        console.log(`Connected MongoDB`);
        console.log(`Database: ${dbName}`);
        const todosCollection = db.collection('todos');

        // Middleware
        app.use(bodyParser.json());
        app.use(cors({
            origin: 'http://localhost:3000'
        }));

        // Start server
        app.listen(1337, () => {
            console.log('listening on port 1337');
        });

        // GET routes
        app.get('/', (req, res) => {
            res.send('Todo backend up and running.');
        });
        app.get('/tasks', (req, res) => {
            todosCollection.find().toArray()
                .then(results => {
                    res.status(200).send(results);
                })
                .catch(error => console.error(error))
        });

        // POST routes
        app.post('/tasks',(req, res) => {
            todosCollection.insertOne(req.body)
                .then(result => {res.status(200).send()})
                .catch(err => console.error(err))
        });

        // PUT routes
        app.put('/tasks', (req, res) => {
            console.log(req.body);
        });
    })
    .catch(console.error);