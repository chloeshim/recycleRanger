$(function(){
      
    $("#footerMenu").load("footer_menu.html", () => {

        // TODO: This one 1 second delay is needed to wait for the whole page to be rendered. Revisit if there's a cleaner way to do this later.
        setTimeout(bindFooterButtons, 1000)        
    })

    $("#daily_lesson").click(function() {
        $(location).attr('href', '/lesson.html');
    });

    $("#today_quiz").click(function() {
        $(location).attr('href', '/quiz.html');
    });

    $("#lesson_btn").click(function() {
        $(location).attr('href', '/index.html');
    });
})