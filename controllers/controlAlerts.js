
const Alert = require("../models/handleAPIRequest")
const { writeDataToFile, getPostData } = require("../writeToFile")
const dbName = "MongoDB_Test";

const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb+srv://testUser:bossgaming725@tietokanta-001.9ggrzmv.mongodb.net/MongoDB_Test";
const client = new MongoClient(url);


async function getAlerts(req, res) {

    try {

        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection("MongoDB_Test_Collection");
        const findResult = await collection.find({}).toArray();

        console.log(findResult);
        client.close();
    
        res.writeHead(201, { "Content-Type": 'application/json' })
        return res.end(JSON.stringify(findResult))
        
    } catch (error) {
        console.log(error);
    };

};

async function getAlert(req, res, id) {
    
    try {

        await client.connect();

        const db = client.db();
        const collection = db.collection("MongoDB_Test_Collection");
        const findResult = await collection.find({"_id": new ObjectId(id)}).toArray();

        console.log("--", findResult);
        client.close();
    
        res.writeHead(201, { "Content-Type": 'application/json' })
        return res.end(JSON.stringify(findResult))
        
    } catch (error) {
        console.log(error);
    };
}


async function deleteAlert(res, id) {

    let alerts = require("../data/alerts");
    let newAlerts = alerts.filter(x => {
        return x.id != id;
    })

    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("MongoDB_Test_Collection");
    const result = await collection.deleteOne({"_id": new ObjectId(id)})

    client.close();
    console.log(result);

    if (process.env.NODE_ENV !== 'test') {
        writeDataToFile('./data/alerts.json', newAlerts);
    };

    res.writeHead(201, { "Content-Type": 'application/json' })
    return res.end(JSON.stringify(newAlerts))

}

async function updateData(req, res, id) {

    try {
        const alert = await Alert.findById(id);

        console.log(alert)

        if (!alert) {
            res.writeHead(404, { "Content-Type": 'application/json' })
            res.end(JSON.stringify({ message: "Alert not found" }))
        } else {

            const body = await getPostData(req)
            const {name, code, status} = JSON.parse(body)
            const alertData = {
                name: name || alert.name,
                code: code || alert.code,
                status: status || alert.status
            };

            const updAlert = await Alert.update(id, alertData);
            console.log("UPDATED ALERT:", updAlert)

            await client.connect();

            const db = client.db(dbName);
            const collection = db.collection("MongoDB_Test_Collection");
            const result = await collection.updateOne({"_id": new ObjectId(id)}, {$set: alertData})
    
            console.log(updAlert, result)
            client.close();
        
            res.writeHead(201, { "Content-Type": 'application/json' })
            return res.end(JSON.stringify(updAlert))
        }

    } catch (error) {
        console.log(error)
    }

}

async function createAlert(req, res) {

    try {

        console.log("s")

        //const body = await getPostData(req);
        const { name, code, status } = req.body;
        const alert = {
            name,
            code,
            status
        };

        console.log("s")
        await client.connect();
        console.log("d")

        const db = client.db(dbName);
        const collection = db.collection("MongoDB_Test_Collection");
        const result = await collection.insertMany([alert])

        alert["id"] = alert["_id"]
        console.log(alert)
        client.close();
    
        res.writeHead(201, { "Content-Type": 'application/json' })
        return res.end(JSON.stringify(alert))

    } catch (error) {
        console.log(error)
    };

}


module.exports = {
    getAlerts,
    getAlert,
    createAlert,
    deleteAlert,
    updateData
};