require('dotenv').config()
const Ajv = require('ajv');
const ajv = new Ajv();

// Express
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {ObjectId} = require("mongodb");

// MongoDB
const MongoClient = require('mongodb').MongoClient;

// Define schema

const createSchema = {
    type: 'object',
    properties: {
        title: {type: 'string'},
        task: {type: 'string'},
        completed: {type: 'boolean'},
        date: {type: 'string'}
    },
    required: ['title', 'task', 'completed', 'date'],
    additionalProperties: false
}

const editSchema = {
    type: 'object',
    properties: {
        _id: {type: 'string'},
        title: {type: 'string'},
        task: {type: 'string'},
        type: {type: 'string'},
    },
    required: ['_id', 'title', 'task', 'type'],
    additionalProperties: false
}

const completeSchema = {
    type: 'object',
    properties: {
        _id: {type: 'string'},
        type: {type: 'string'},
        completed: {type: 'boolean'},
    },
    required: ['_id', 'type', 'completed'],
    additionalProperties: false
}

const deleteSchema = {
    type: 'object',
    properties: {
        _id: {type: 'string'}
    },
    required: ['_id'],
    additionalProperties: false
}

MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        // DB Setup
        const db = client.db(process.env.DB_NAME);
        console.log(`Connected MongoDB`);
        console.log(`Database: ${process.env.DB_NAME}`);
        const todosCollection = db.collection('todos');

        // Middleware
        app.use(bodyParser.json());
        app.use(cors({
            origin: process.env.CORS_ORIGIN
        }));

        // Start server
        app.listen(process.env.PORT, () => {
            console.log('listening on port 1337');
        });

        // GET routes
        app.get('/', (req, res) => {
            res.send('Todo backend up and running.');
        });
        app.get('/tasks', (req, res) => {
            todosCollection.find().sort({date: -1}).toArray()
                .then(results => {
                    res.status(200).send(results);
                })
                .catch(error => console.error(error))
        });

        // POST routes
        app.post('/tasks',(req, res) => {
            const validate = ajv.compile(createSchema);
            if (validate(req.body)) {
                todosCollection.insertOne(req.body)
                .then(result => {res.status(200).send()})
                .catch(err => console.error(err))
            } else {
                res.json('invalid request body')
                .catch(err => console.error(err));
            }
        });

        // PUT routes
        app.put('/tasks', (req, res) => {
            if (req.body.type === 'edit') {
                todosCollection.findOneAndUpdate(
                    {_id: ObjectId(req.body._id)},
                    {
                        $set: {
                            title: req.body.title,
                            task: req.body.task
                        }
                    },
                    {
                        upsert: false
                    }
                )
                    .then(result => {
                        res.json('success')
                    })
                    .catch(error => console.error(error))
            } else if (req.body.type === 'complete') {
                const completed = !req.body.completed;
                todosCollection.findOneAndUpdate(
                    {_id: ObjectId(req.body._id)},
                    {
                        $set: {
                            completed: completed
                        }
                    },
                    {
                        upsert: false
                    }
                )
                    .then(result => {
                        res.json('success');
                    })
                    .catch(error => console.error(error))
            } else {
                res.json('failed')
                .catch((error => console.error(error)));
            }
        });

        // DELETE routes
        app.delete('/tasks', (req, res) => {
            todosCollection.deleteOne(
                { _id: ObjectId(req.body._id) }
            )
                .then(result => {
                    res.json('success')
                })
                .catch(error => console.error(error))
        });
    })
    .catch(console.error);