
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
        $("#footer_take_picture_input").trigger("click")
    })
}

function hideImageInputDisplay() {
    // TODO: Update this implementation to show the full file after the analysis page is ready.
    $("#image_input_display").hide()
}

function observeTakePictureInput() {

    $("#footer_take_picture_input").change(function (){
        // TODO: Update this implementation to show the full file after the analysis page is ready.
        displayImage(this)
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
