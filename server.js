const HTTP = require("http");
let ALERTS = require("./data/alerts")
let METHODS = require("./data/methods")

const SERVER = HTTP.createServer((req, res) => {

    for (let index in METHODS) {
        const table = METHODS[index];
        if ( ((table.URLTYPE == "match" && String(req.url).match(/\/api\/alerts\/\w+/)) || req.url == table.URL) && req.method == table.METHOD) {
            if (table.URLTYPE == "match") {
                const id = req.url.split('/')[3];
                console.log(table.METHOD + " request: " + res.statusCode);
                console.log("ID: " + id);
            } else {
                console.log(table.METHOD + " " + res.statusCode);
            };
            res.end(JSON.stringify(ALERTS));
            return;
        };
    };

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({message: "URL Not Found: endpoint - api/alerts"}));

});


const PORT = process.env.PORT || 5000;
SERVER.listen(PORT, () => console.log(`Server running on port ${PORT}`));