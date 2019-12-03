"use strict";

const path = require("path");
const vision = require("@google-cloud/vision");

/**
 * Responsible for labeling passed image.
 */
module.exports = class ImageLabelingService {

    /**
     * Returns top-most label for the image passed in the filePath.
     * @param {*} filePath String value of image's file path in the system.
     * @returns {String} Image's top-most label in String. Async.
     */
    static async getLabelForImage(filePath) {

        // TODO: This is unsafe. Move this to outside of code later.
        var keyPath = path.resolve(__dirname + '/../recycle-ranger-demo-gvapikey.json')
        
        var client = new vision.ImageAnnotatorClient({ keyFilename: keyPath })

        var [result] = await client.labelDetection(filePath)
        var labels = result.labelAnnotations

        if (labels.length > 0) {
            return labels[0].description
        } else {
            return "Unknown"
        }        
    }
    
}