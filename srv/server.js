// init .env vars
require('dotenv').config()

// Ajv and sanitize-html options
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const sanitizeHtml = require('sanitize-html');
const sanitizeOptions = {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: 'recursiveEscape'
}

// MongoDB
const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require("mongodb");

// Express
const fs = require('fs');
const key = fs.readFileSync(process.env.SSL_KEY);
const cert = fs.readFileSync(process.env.SSL_CERT);
const https = require('https');
const express = require('express');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


// Define schema and validation formats

ajv.addFormat('putTypes', {
   validate: (type) => type === 'edit' || 'complete'
});

ajv.addFormat('objectId', /\S{24}/);

const createSchema = {
    type: 'object',
    properties: {
        title: {type: 'string', minLength: 1, maxLength: 50},
        task: {type: 'string', minLength: 1, maxLength: 280},
        completed: {type: 'boolean'},
        date: {type: 'string'}
    },
    required: ['title', 'task', 'completed', 'date'],
    additionalProperties: false
}

const editSchema = {
    type: 'object',
    properties: {
        _id: {type: 'string', format: 'objectId'},
        title: {type: 'string', minLength: 1, maxLength: 50},
        task: {type: 'string', minLength: 1, maxLength: 280},
        type: {type: 'string', format: 'putTypes'},
    },
    required: ['_id', 'title', 'task', 'type'],
    additionalProperties: false
}

const completeSchema = {
    type: 'object',
    properties: {
        _id: {type: 'string', format: 'objectId'},
        type: {type: 'string', format: 'putTypes'},
        completed: {type: 'boolean'},
    },
    required: ['_id', 'type', 'completed'],
    additionalProperties: false
}

const deleteSchema = {
    type: 'object',
    properties: {
        _id: {type: 'string', format: 'objectId'}
    },
    required: ['_id'],
    additionalProperties: false
}

// Main Server. Must connect to a MongoDB instance before starting API.
MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        console.log(`Connected MongoDB`);

        // Connect to DB
        const db = client.db(process.env.DB_NAME);
        console.log(`Database: ${process.env.DB_NAME}`);
        const todosCollection = db.collection('todos');

        // Middleware
        app.use(bodyParser.json());

        app.use(cors({
            "origin": process.env.CORS_ORIGIN,
            "methods": "GET,PUT,POST,DELETE"
        }));

        app.use(helmet());

        // Start server with HTTPS
        https.createServer({key, cert}, app).listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT}`);
        });

        // GET routes

        // Respond to root GET with a message
        app.get('/', (req, res) => {
            res.send('Todo backend up and running.');
        });

        // Grab todos from DB and sanitise the relevant output.
        app.get('/tasks', (req, res) => {
            todosCollection.find().sort({date: -1}).toArray()
                .then(dirtyResults => {
                    return dirtyResults.map((result) => {
                        return (
                            {
                                _id: result._id,
                                title: sanitizeHtml(result.title, sanitizeOptions),
                                task: sanitizeHtml(result.task, sanitizeOptions),
                                completed: result.completed,
                                date: sanitizeHtml(result.date, sanitizeOptions)
                            }
                        )
                    });
                })
                .then(cleanResults => {
                    res.status(200).send(cleanResults);
                })
                .catch(error => console.error(error))
        });

        // POST routes

        // Validate POST data against schema and insert into DB if valid. If not respond with an array of objects containing the error type and message.
        app.post('/tasks',(req, res) => {
            const validate = ajv.compile(createSchema);
            if (validate(req.body)) {
                todosCollection.insertOne(req.body)
                .then(result => {res.json('success')})
                .catch(err => console.error(err))
            } else {
                if (validate.errors) {
                    const errors = validate.errors.map((error) => {
                        return {
                            type: error.instancePath.replace('/', ''),
                            error: error.message
                        }
                    });
                    console.log(errors);
                    res.json(errors);
                } else {
                    console.log('no input');
                    res.status(500).send();
                }
            }
        });

        // PUT routes

        // Check if req.body.type is a valid input, then validate PUT data against schema. Edit or complete DB entry if valid and the ObjectId matches.
        // If not respond with an array of objects containing the error type/s and message/s.
        // TODO: run all validation through ajv. remove if/else for req.body.type
        app.put('/tasks', (req, res) => {
            if (req.body.type === 'edit') {
                const validate = ajv.compile(editSchema);
                if (validate(req.body)) {
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
                } else {
                    if (validate.errors) {
                        const errors = validate.errors.map((error) => {
                            return {
                                type: error.instancePath.replace('/', ''),
                                error: error.message
                            }
                        });
                        console.log(errors);
                        res.json(errors);
                    } else {
                        console.log('no input');
                        res.status(500).send();
                    }
                }
            } else if (req.body.type === 'complete') {
                const validate = ajv.compile(completeSchema);
                if (validate(req.body)) {
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
                    if (validate.errors) {
                        const errors = validate.errors.map((error) => {
                            return {
                                type: error.instancePath.replace('/', ''),
                                error: error.message
                            }
                        });
                        console.log(errors);
                        res.json(errors);
                    } else {
                        console.log('no input');
                        res.status(500).send();
                    }
                }
            } else {
                res.json('invalid PUT type');
            }
        });

        // DELETE routes

        // Validate DELETE data against schema and remove matching ObjectId from DB if valid. If not respond with an array of objects containing the error type and message.
        app.delete('/tasks', (req, res) => {
            const validate = ajv.compile(deleteSchema);
            if (validate(req.body)) {
                todosCollection.deleteOne(
                    { _id: ObjectId(req.body._id) }
                )
                    .then(result => {
                        res.json('success')
                    })
                    .catch(error => console.error(error))
            } else {
                if (validate.errors) {
                    const errors = validate.errors.map((error) => {
                        return {
                            type: error.instancePath.replace('/', ''),
                            error: error.message
                        }
                    });
                    console.log(errors);
                    res.json(errors);
                } else {
                    console.log('no input');
                    res.status(500).send();
                }
            }
        });
    })
    .catch(console.error);