const express = require('express');
let crypto = require('crypto');
const exec = require('child_process').exec;

const app = express();

const secret = "secret";
const downtime = (stdout) => console.log("asdfghjk",stdout)

app.post('/hook', (req, res) => {
    req.on('data', function (chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        if (req.headers['x-hub-signature'] == sig) {
            const process = exec('bash deploy.sh', (err, stdout, stderr) => downtime(stdout))
            res.status(200);
        }
    })
})

app.listen(8080, () => console.log('Helper is running...'))