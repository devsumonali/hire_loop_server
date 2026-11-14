import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000;

//connect middleware
app.use(express.json());
app.use(cors());

//connect mongodb
const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('You successfully connected to MongoDB!');
        return client;
    } catch (err) {
        console.dir(err);
    }
}

const connectedClient = await connectToMongoDB();
const database = connectedClient.db('hire_loop');
const users = database.collection('user');
const jobs = database.collection('jobs');

app.get('/', (req, res) => {
    res.send('Hello world');
});

//job get api create
app.get('/jobs', async (req, res) => {
    const cursor = jobs.find();
    const result = await cursor.toArray();
    res.send(result);
});

//job post api create
app.post('/jobs', async (req, res) => {
    const job = req.body;
    const cursor = await jobs.insertOne(job);
    res.send(cursor);
});

// create new api
app.get('/users', async (req, res) => {
    const cursor = users.find({});
    const result = await cursor.toArray();
    res.send(result);
});

app.listen(port, () => {
    console.log('Server is running on port', port);
});
