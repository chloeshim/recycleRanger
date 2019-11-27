
function bindFooterButtons() {

    bindFooterHomeButton()
    bindFooterProfileButton()
    bindFooterTakePictureButton()
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
