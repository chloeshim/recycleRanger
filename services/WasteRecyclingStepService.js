"use strict";

/**
 * Resposible for returning recycling steps for a certain type of waste.
 */
module.exports = class WasteRecyclingStepService {

    /**
     * Returns array of String on how to recycle the passed wasteType.
     * @param {String} wasteType String value of the waste type.
     * @returns {Array} Ordered array of String on how to recycle the waste type.
     */
    static getRecyclingSteps(wasteType) {

        // TODO: Add more thorough waste type / repository later on.

        if (wasteType == null || wasteType.length == 0) {
            return this.recyclingStepsForUnknownType()
        }

        var lowercaseWasteType = wasteType.toLowerCase()

        if (lowercaseWasteType.includes("bottle")) {
            return this.recyclingStepsForBottle()
        }
        
        return this.recyclingStepsForUnknownType()
    }

    /**
     * Returns array of String on how to recycle bottles.
     * @returns {Array} Ordered array of String on how to recycle the waste type.
     */
    static recyclingStepsForBottle() {

        return [
            "Remove any plastic label from the bottle and throw it to Landfill bin.",
            "Remove any cap from the bottle and throw it to Landfill bin.",
            "If possible, crush the bottle using your hands.",
            "Throw away the bottle to Landfill bin."
        ]
    
    }

    /**
     * Returns array of String on how to recycle unknown waste type.
     * @returns {Array} Ordered array of String on how to recycle the waste type.
     */
    static recyclingStepsForUnknownType() {

        return [
            "The Recycle Ranger system currently does not have the recycling steps for this waste type. Please throw this waste away to Landfill bin."
        ]
        
    }
}