import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

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

app.get('/login', async (req, res) => {
    let client;

    try {
        // Connect to the MongoDB client
        client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const employees = await collection.find({name: req.query.name}).toArray();
        res.json(employees);
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


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
