$(function(){
      
    $("#footerMenu").load("footer_menu.html", () => {
        bindFooterButtons()
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

    $("#leader_board").click(function() {
        $(location).attr('href', '/leaderboard.html');
    });
})