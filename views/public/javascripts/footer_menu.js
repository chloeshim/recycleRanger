
function bindFooterButtons() {

    bindFooterHomeButton()
    bindFooterProfileButton()
    bindFooterTakePictureButton()

    hideImageInputDisplay()
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

function hideImageInputDisplay() {
    // TODO: Update this implementation to show the full file after the analysis page is ready.
    $("#image_input_display").hide()
}

function observeTakePictureInput() {

    $("#waste_image_input").change(function() {
        // TODO: Update this implementation to show the full file after the analysis page is ready.
        displayImage(this)
        submitImageFileToServer()
    })

}

function displayImage(input) {

    var fileAvailable = (input.files != null) && (input.files[0] != null)

    if (!fileAvailable) {
        return
    }

    var fileReader = new FileReader()

    fileReader.onload = (file) => {
        $("#image_input_display").attr("src", file.target.result)
        $("#image_input_display").show()
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
            console.log("received wastetype: " + data.wastetype)
        },
        error: (xhr) => {
            // TODO: Add proper implementation here later.
            console.log(xhr.statusText + xhr.responseText)
        }
    })

}