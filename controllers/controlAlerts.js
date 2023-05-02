
const Alert = require("../models/handleAPIRequest")
const { writeDataToFile, getPostData } = require("../writeToFile")

async function getAlerts(req, res, id) {

    try {
        const alerts = await Alert.findAll();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(alerts));
    } catch (error) {
        console.log(error);
    };

};

async function deleteAlert(res, id) {

    let alerts = require("../data/alerts");
    let newAlerts = alerts.filter(x => {
        return x.id != id;
    })

    if (process.env.NODE_ENV !== 'test') {
        writeDataToFile('./data/alerts.json', newAlerts);
    };

    res.writeHead(201, { "Content-Type": 'application/json' })
    return res.end(JSON.stringify(newAlerts))

}

async function updateData(req, res, id) {

    try {
        const alert = await Alert.findById(id);

        if (!alert) {
            res.writeHead(404, { "Content-Type": 'application/json' })
            res.end(KSON.stringify({ message: "Alert not found" }))
        } else {

            const body = await getPostData(req)
            const {name, code, status} = JSON.parse(body)
            const alertData = {
                name: name || alert.name,
                code: code || alert.code,
                status: status || alert.status
            };

            const updAlert = await Alert.update(id, alertData);

            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(updAlert));

        }

    } catch (error) {
        console.log(error)
    }

}

async function createAlert(req, res) {

    try {

        const body = await getPostData(req);
        const { name, code, status } = JSON.parse(body);
        const alert = {
            name,
            code,
            status
        };
        
        console.log(body)

        const newAlert = await Alert.create(alert);

        res.writeHead(201, { "Content-Type": 'application/json' })
        return res.end(JSON.stringify(newAlert))

    } catch (error) {
        console.log(error)
    };

}


module.exports = {
    getAlerts,
    createAlert,
    deleteAlert,
    updateData
};