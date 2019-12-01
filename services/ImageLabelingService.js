"use strict";

const vision = require("@google-cloud/vision");

/**
 * Responsible for labeling passed image.
 */
module.exports = class ImageLabelingService {

    /**
     * Returns top-most label for the image passed in the filePath.
     */
    static async getLabelForImage(filePath) {

        var client = new vision.ImageAnnotatorClient()

        var [result] = await client.labelDetection(filePath)
        var labels = result.labelAnnotations

        if (labels.length > 0) {
            return labels[0].description
        } else {
            return "Unknown"
        }        
    }
    
}