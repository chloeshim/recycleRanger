$(function(){
      
    $("#footerMenu").load("footer_menu.html", () => {
        bindFooterButtons()
    })

    $("#daily_lesson").click(function() {
        $(location).attr('href', '/lesson.html');
    });
})