const HTTP = require("http");
const METHODS = require("./data/methods")
const { getAlerts, getAlert, createAlert, deleteAlert, updateData } = require("./controllers/controlAlerts")


// Creating server.

const SERVER = HTTP.createServer((req, res) => {

    const id = req.url.split("/")[3]
    let added = ""

    for (let index in METHODS) {
        const table = METHODS[index];
        if ( ((table.URLTYPE == "match" && String(req.url).match(/\/api\/alerts\/\w+/)) || req.url == table.URL) && req.method == table.METHOD) {
            if (table.URLTYPE == "match") {

                // Methods that have anything after the ./api/alerts URL.

                console.log(table.METHOD + " request: " + res.statusCode);
                console.log("ID: " + id);

                if (table.METHOD == "GET") {
                    console.log(id)
                    if (id) {
                        getAlert(req, res, id)
                    } else {
                        getAlerts(req, res, id)
                    }
                } else if (table.METHOD == "POST") {
                    console.log("create:", id)
                    createAlert(req, res)
                } else if (table.METHOD == "DELETE") {
                    deleteAlert(res, id)
                } else if (table.METHOD == "PUT") {
                    updateData(req, res, id)
                };

            } else {

                // Methods that don't require any extra information.
                console.log(table.METHOD + " " + res.statusCode);
                if (table.METHOD == "POST") {
                    console.log("create:", id)
                    createAlert(req, res)
                };
            };
            return;
        };
    };

    // Writing the response.

    console.log(req, res)

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({message: "URL Not Found: endpoint - api/alerts"+added}));

});


// Linking the server.

const PORT = process.env.PORT || 5000;
SERVER.listen(PORT, () => console.log(`Server running on port ${PORT}`));