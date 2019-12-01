
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

        // submitImageFileToServer() // TODO: Uncomment this later after the modal is ready.
    })

}

function resetRecyclingStepsModal() {
    
    $("#recycling_steps_title").val("Analyzing waste type, please wait...")
    $("#recycling_steps_list").empty()
    
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

function submitImageFileToServer() {

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
            // TODO: Add proper implementation here later.

            console.log("Received waste type: " + data.wasteType)

            console.log("Recycling steps:")
            
            data.recyclingSteps.forEach(step => {
                console.log(step)
            })
        },
        error: (xhr) => {
            // TODO: Add proper implementation here later.
            console.log(xhr.statusText + xhr.responseText)
        }
    })

}