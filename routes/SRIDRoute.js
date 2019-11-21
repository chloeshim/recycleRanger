"use strict";
const path = require("path");

module.exports = class FSERoute {


    constructor(app) {
    
        /* get */
        app.get('/', (req, res) => {
            res.sendFile(path.resolve(__dirname + '/../views/public/index.html'));
        });
    }
}