const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 9000;

const uri = "mongodb+srv://mahabub3:JhYWH49UTIy2W6Oa@cluster0.wcxgg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const quizes = require('./quizes.json');

const main = async () => {
    const quizeCollection = client.db('triviamania').collection('quiztopics');
    try {
        app.get('/quizes', async (req, res) => {
            try {
                res.status(200).send({ message: 'Everything is OK', data: await quizeCollection.find({}).toArray() });
            }
            catch (err) {
                res.status(500).send({ message: 'Internal server error', data: [] });
            }
        });
        app.get('/quizes/:qid', async (req, res) => {
            try {
                res.status(200).send({ message: 'Everything is OK', data: await quizeCollection.findOne({ _id: ObjectId(req.params.qid) }) });
            }
            catch (err) {
                res.status(500).send({ message: 'Internal server error', data: {} });
            }
        });
        app.put('/');
    }
    finally {

    }
};
main().catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hellso sWorld!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});