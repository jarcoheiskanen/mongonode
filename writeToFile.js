const fs = require("fs");

function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
    });
};

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            console.log(1)
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            console.log(body)
            req.on('end', () => {
                resolve(body);
            });
            console.log(body)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    writeDataToFile,
    getPostData
};