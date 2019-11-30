"use strict";
const path = require("path");

module.exports = class FSERoute {


    constructor(app) {

        /* get */
        app.get('/', (req, res) => {
            res.sendFile(path.resolve(__dirname + '/../views/public/index.html'));
        });

        app.get('/styleguide', (req, res) => {
            res.sendFile(path.resolve(__dirname + '/../styleguide/index.html'));
        });

        app.get('/leader', (req, res) => {
            res.sendFile(path.resolve(__dirname + '/../views/public/leaderboard.html'));
        });

<<<<<<< Updated upstream
        app.get('/quiz', (req, res) => {
            res.sendFile(path.resolve(__dirname + '/../views/public/quiz.html'));
        });

=======
>>>>>>> Stashed changes
        app.get('/profile', (req, res) => {
            res.sendFile(path.resolve(__dirname + '/../views/public/profile.html'));
        });

        app.get('/footer', (req, res) => {
            res.sendFile(path.resolve(__dirname + '/../views/public/footer_menu.html'));
        });
    }
}