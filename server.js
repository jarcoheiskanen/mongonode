const HTTP = require("http");
const METHODS = require("./data/methods")

const { getAlerts, getAlert, createAlert, deleteAlert, updateData } = require("./controllers/controlAlerts")
const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb+srv://testUser:bossgaming725@tietokanta-001.9ggrzmv.mongodb.net/MongoDB_Test";
const client = new MongoClient(url);

let itemsCollection;

const express = require("express");
const cors = require("cors")
const app = express();

app.use(cors())
app.use(express.json())


// MONGO

client.connect(err => {
    if (err) {
        console.error("Failed to connect to MongoDB", err);
        return;
    }
    console.log("Connected to MongoDB")

    const DB = client.db("MongoDB_Test");
    itemsCollection = DB.collection("MongoDB_Test_Collection")
})

// GET

app.get('/api/alerts', async (req, res) => {
    getAlerts(req, res)
});

app.get('/api/alerts/:id', async (req, res) => {
    const id = req.url.split("/")[3]
    getAlert(req, res, id)
});


// POST

app.post('/api/alerts', (req, res) => {
    console.log("IASUHSDA")
    createAlert(req, res)
});


// PUT

app.put('/api/alerts/:id', (req, res) => {
    const id = req.url.split("/")[3]
    console.log("CHANGING:", id)
    updateData(req, res, id)
});


// REMOVE

app.delete('/api/alerts/:id', (req, res) => {
    const id = req.url.split("/")[3]
    deleteAlert(res, id)
});


// SERVER

app.listen(5000, () => {
    console.log("Server is running. Port:", 5000);
})