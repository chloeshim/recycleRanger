
// MARK: - On document loaded setup
$(function() {

    $("#footerMenu").load("footer_menu.html", () => {

        // TODO: This one 1 second delay is needed to wait for the whole page to be rendered. Revisit if there's a cleaner way to do this later.
        setTimeout(bindFooterButtons, 1000)
    })
})


// MARK: - Function declarations -

function bindFooterButtons() {

    bindFooterHomeButton()
    bindFooterProfileButton()
    bindFooterTakePictureButton()

    observeTakePictureInput()
}

function bindFooterHomeButton() {
    // TODO: Implement this later.
}

function bindFooterProfileButton() {
    // TODO: Implement this later.
}

function bindFooterTakePictureButton() {

    $("#footer_btn_take_picture").click( () => {
        $("#waste_image_input").trigger("click")
    })
}

function observeTakePictureInput() {

    $("#waste_image_input").change(function() {
        
        resetRecyclingStepsModal()
        showRecyclingStepsModal(this)

        retrieveRecyclingStepsForImageInForm()
    })

}

function resetRecyclingStepsModal() {
    
    $("#recycling_steps_title").html("Analyzing waste type...")
    $("#recycling_steps_list").empty()
    
    showSpinners()
}

function showSpinners() {

    $("#modal_title_spinner").show()
    $("#recycling_steps_spinner").show()
}

function showRecyclingStepsModal(input) {

    var fileAvailable = (input.files != null) && (input.files[0] != null)

    if (!fileAvailable) {
        return
    }

    var fileReader = new FileReader()

    fileReader.onload = (file) => {
        $("#image_input_display").attr("src", file.target.result)
        $("#recycling_steps_modal_container").modal()
    }

    fileReader.readAsDataURL(input.files[0])
}

function retrieveRecyclingStepsForImageInForm() {

    var form = $("#waste_image_detection_form")[0]

    var data = new FormData(form)    
    
    $.ajax({
        url:"/wasteimages",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST',
        enctype: 'multipart/form-data',
        success: (data, status, xhr) => {
            
            hideSpinners()

            setWasteTypeTitle(data.wasteType)
            setRecyclingSteps(data.recyclingSteps)            
        },
        error: (xhr) => {
            // TODO: Add proper implementation here later.
            console.log(xhr.statusText + xhr.responseText)
        }
    })

}

function hideSpinners() {
    
    $("#modal_title_spinner").hide()
    $("#recycling_steps_spinner").hide()
}

function setWasteTypeTitle(wasteType) {
    $("#recycling_steps_title").html("Waste type found: " + wasteType)
}

function setRecyclingSteps(recyclingSteps) {

    recyclingSteps.forEach(step => {

        var stepItem = $("<li>" + step + "</li>")
        $("#recycling_steps_list").append(stepItem)
    })
}

