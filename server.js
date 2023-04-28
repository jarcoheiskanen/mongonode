const HTTP = require("http");
const METHODS = require("./data/methods")
const { getAlerts } = require("./controllers/controlAlerts")

const SERVER = HTTP.createServer((req, res) => {

    const id = req.url.split("/")[3]
    console.log(id)

    for (let index in METHODS) {
        const table = METHODS[index];
        if ( ((table.URLTYPE == "match" && String(req.url).match(/\/api\/alerts\/\w+/)) || req.url == table.URL) && req.method == table.METHOD) {
            if (table.URLTYPE == "match") {
                console.log(table.METHOD + " request: " + res.statusCode);
                console.log("ID: " + id);
                if (table.METHOD == "GET") {
                    console.log(id)
                    getAlerts(req, res, id)
                };
            } else {
                console.log(table.METHOD + " " + res.statusCode);
            };
            return;
        };
    };

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({message: "URL Not Found: endpoint - api/alerts"}));

});


const PORT = process.env.PORT || 5000;
SERVER.listen(PORT, () => console.log(`Server running on port ${PORT}`));