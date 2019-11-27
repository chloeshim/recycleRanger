$(function(){
      
    $("#footerMenu").load("footer_menu.html"); 

    $("#takePhoto").click( () => {
        $("#imageInput").trigger("click")
    })

    $("#imageInput").change(function (){
        displayImage(this)
    })

    function displayImage(input) {

        var fileAvailable = (input.files != null) && (input.files[0] != null)

        if (!fileAvailable) {
            return
        }

        var fileReader = new FileReader()

        fileReader.onload = (file) => {
            $("#imageInputDisplay").attr("src", file.target.result)
        }

        fileReader.readAsDataURL(input.files[0])
    }
});