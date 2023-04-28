
const Alert = require("../models/handleAPIRequest")

async function getAlerts(req, res, id) {

    try {
        const alerts = await Alert.findAll();

    
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(alerts));
    } catch (error) {
        console.log(error);
    };

};

module.exports = {
    getAlerts
};