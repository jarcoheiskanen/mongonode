let alerts = require("../data/alerts")
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile, getPostData } = require("../writeToFile")

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(alerts);
    });
};

function findById(id) {
    console.log(id, alerts)
    return new Promise((resolve, reject) => {
        const alert = alerts.find((a) => a.id == id)
        resolve(alert);
    })
}

function update(id, alert) {
    return new Promise((resolve, reject) => {
        const index = alerts.findIndex((a) => a.id.toString() === id.toString())
        alerts[index] = {id, ...alert}
        writeDataToFile('./data/alerts.json', alerts);
        resolve(alerts)
    })
}


function create(alert) {
    return new Promise((resolve, reject) => {
        const newAlert = {id: uuidv4(), ...alert};
        alerts.push(newAlert);
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/alerts.json', alerts);
        };
        resolve(newAlert)
    })
}

module.exports = {
    findAll,
    create,
    findById,
    update
};