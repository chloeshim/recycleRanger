$(function(){

    var socket = io();
    socket.on("currentScore", (currentScore)=>{
        console.log(currentScore);
        $("#heart_number").text(currentScore.toString());
    })

    $("#daily_lesson").click(function() {
        $(location).attr('href', '/lesson');
    });

    $("#today_quiz").click(function() {
        $(location).attr('href', '/quiz');
    });

    $("#lesson_btn").click(function() {
        $(location).attr('href', '/');
    });

    $("#leader_board").click(function() {
        $(location).attr('href', '/leader');
    });
})