let alerts = require("../data/alerts")

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(alerts);
    });
};

module.exports = {
    findAll
};