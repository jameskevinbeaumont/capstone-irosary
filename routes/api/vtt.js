const express = require('express');
const router = express.Router();
const db = require('../../database');
const fs = require('fs');
const convertVttToJson = require('./vttjson');

router.route('/:filename')
    // POST route to create JSON file from VTT file
    .post((req, res) => {
        // Read the file
        let syncData = [];
        fs.readFile(`./data/${req.params.filename}`, 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).send(`Unable to locate the file requested`);
            } else {
                // Get all of the VTT records
                convertVttToJson(data)
                    .then((result) => {
                        let x = 0;
                        for (let i = 0; i < result.length; i++) {
                            if (result[i].part && result[i].part.trim() !== '') {
                                syncData[x] = result[i];
                                x++;
                            };
                        };
                        const stringifyData = JSON.stringify(syncData);
                        const fileSplit = req.params.filename.split('.');
                        const outputJSONFile = `${fileSplit[0]}.json`;
                        fs.writeFile(`./data/${outputJSONFile}`, stringifyData, 'utf8', (err) => {
                            if (err) {
                                res.status(400).send(`Error writing ${fileSplit[0]}.json: ${err}`);
                            } else {
                                res.status(200).send(syncData);
                            };
                        });
                    });
            };
        });
    });

module.exports = router;