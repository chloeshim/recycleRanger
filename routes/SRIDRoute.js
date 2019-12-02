"use strict";
const path = require("path");

const multer =  require("multer");
const imageUploadsFolderPath = "imageuploads/"
const imageUploads = multer({ dest: imageUploadsFolderPath });

const imageLabelingService = require("../services/ImageLabelingService");
const wasteRecyclingStepService = require("../services/WasteRecyclingStepService");

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

        app.get('/quiz', (req, res) => {
            res.sendFile(path.resolve(__dirname + '/../views/public/quiz.html'));
        });

        app.get('/profile', (req, res) => {
            res.sendFile(path.resolve(__dirname + '/../views/public/profile.html'));
        });

        app.get('/footer', (req, res) => {
            res.sendFile(path.resolve(__dirname + '/../views/public/footer_menu.html'));
        });

        app.get('/cheer_completed', (req, res) => {
            res.sendFile(path.resolve(__dirname + '/../views/public/cheer_completed.html'));
        });
        app.get('/being_cheered', (req, res) => {
            res.sendFile(path.resolve(__dirname + '/../views/public/being_cheered.html'));
        });

        /* post */
        app.post('/wasteimages', imageUploads.single("wasteimage"), async (req, res, next) => {
            
            // TODO: Implement proper handling here later.
            var receivedFile = req.file
            console.log("Received file information:")

            console.log("name: " + receivedFile.filename)
            console.log("encoding: " + receivedFile.encoding)
            console.log("mimetype: " + receivedFile.mimetype)
            console.log("size: " + receivedFile.size)

            var imageFilePath = imageUploadsFolderPath + receivedFile.filename
            var wasteType = await imageLabelingService.getLabelForImage(imageFilePath)
            var recyclingSteps = wasteRecyclingStepService.getRecyclingSteps(wasteType)
            
            res.send({ 
                "wasteType": wasteType,
                "recyclingSteps": recyclingSteps
            })
        })
    }
}
