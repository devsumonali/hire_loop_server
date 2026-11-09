import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 8000;

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

// create new api
app.get('/users', async (req, res) => {
     const cursor = users.find({});
     const result = await cursor.toArray();
     res.send(result);
});

app.listen(port, () => {
     console.log('Server is running on port', port);
});
