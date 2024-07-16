import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser'
import axios from 'axios'

// Load environment variables
dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

// Create an instance of Express
const app = express();
const PORT = 3000;

// Use CORS and JSON middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/employees', async (req, res) => {
    let client;

    try {
        // Connect to the MongoDB client
        client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const employees = await collection.find({}).toArray();
        res.json(employees);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("No employees");
    }
});

app.post('/login', async (req, res) => {
    let client;
    const {username, password} = req.body

    try {
        // Connect to the MongoDB client
        client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const user = await collection.findOne({username, password});
        res.json([user]);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("No employees");
    }
});

app.get('/manages', async (req, res) => {
    let client;

    try {
        // Connect to the MongoDB client
        client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const employeeId = parseInt(req.query.employee_id, 10);
        const employees = await collection.find({ employee_id: employeeId }).toArray();
        res.json(employees);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("No employees");
    }
});

app.get('/employees/:name', async (req, res) => {

    const name = req.params.name;

    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        const query = { 'name': `$*${name}$*` };
        const employees = await collection.find(query).toArray();

        if (employees.length === 0) {
            return res.status(404).json({ error: 'No employees found with that name.' });
        }
        res.json(employees);
        console.log(res.json(employees));
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something's wrong... ☹");
    }
});

app.get('/proxy/:gender/:id.jpg', async (req, res) => {
    const { gender, id } = req.params;
    const imageUrl = `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;

    try {
        // Fetch the image from the external API
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Set the appropriate content-type
        res.set('Content-Type', 'image/jpeg');
        
        // Send the image data to the client
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching image:', error.message);
        res.status(404).send('Image not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
