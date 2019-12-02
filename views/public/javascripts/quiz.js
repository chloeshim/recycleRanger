$(() => {
    /* UI */
    class Questions {
        bank = [
            {
                text: "Do you take off the lids when you recycle a plastic water bottle?",
                answer: true,
                explanation: "Most caps are made out of a different type of plastic that the bottle is made out of. This may result in contamination during the recycling process.",
            },
            {
                text: "2 hit false",
                answer: false,
                explanation: "f",
            },
            {
                text: "3 hit yes",
                answer: true,
                explanation: "t",
            },
            {
                text: "4 hit yes",
                answer: true,
                explanation: "t",
            }

        ];
    }

    class Presenters {
        displayItem(objectID) {
            $("#" + objectID).removeClass("D-n");
        }

        hideItem(objectID) {
            $("#" + objectID).addClass("D-n");
        }

        renderQuestion(question, currentIndex) {
            const questionText = currentIndex.toString() + ". " + question.text;
            $("#question_text").text(questionText);
            $("#modal-text").text(question.explanation);
            this.displayItem("btngrp_answers");
            this.hideItem("btngrp_next_page");
            if (currentIndex === 3) {
                $("#btn_next_question").text("Done! See Results...");
                $("#btn_next_question_on_mainpage").text("Done! See Results...");
            }

        }

        // This shuffle function is copied from Stack Overflow.
        shuffle() {
            var array = [0, 1, 2, 3];
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        render_close_modal() {
            this.hideItem("btngrp_answers")
            this.displayItem("btngrp_next_page");
        }

        renderResultPage(currentScore, totalQuestions) {
            console.log("render page");
            this.hideItem("question-main-container");
            this.displayItem("result-page-main-container");
            $("#text_correct_question_number").text(currentScore.toString());
            $("#text_incorrect_question_number").text((totalQuestions - currentScore).toString());
            $("#text_heart_count").text("+" + (currentScore * 5).toString());
            var socket = io();
            socket.emit('updateScore',currentScore * 5 );
        }

    }

    /* Client */
    const quizClient = function () {
        const presenters = new Presenters();
        const questions = new Questions();
        const service = new Services();

        var socket = io();
        var currentScore = 0;
        var currentIndex = 1;
        const totalQuestions = 3;

        const shuffled_question_index = presenters.shuffle();

        presenters.renderQuestion(questions.bank[shuffled_question_index[0]], currentIndex);

        console.log("ho");

        $("#btn_yes").click(() => {
            console.log("hit yes");
            if (questions.bank[shuffled_question_index[currentIndex - 1]].answer === true) {
                $("#modal-title").text("Correct");
                $("#modal-title").addClass("medium-green").addClass("Fz-B");
                currentScore += 1;
            } else {
                $("#modal-title").text("Incorrect");
                $("#modal-title").addClass("light-coral").addClass("Fz-B");
            }
            $("#modal-text-your-choice").text("You chose YES.")
            $("#btn_questionAnswer").click();
            presenters.render_close_modal();
        })

        $("#btn_no").click(() => {
            console.log("hit no");
            if (questions.bank[shuffled_question_index[currentIndex - 1]].answer === false) {
                $("#modal-title").text("Correct");
                $("#modal-title").addClass("medium-green").addClass("Fz-B");
                currentScore += 1;
            } else {
                $("#modal-title").text("Incorrect");
                $("#modal-title").addClass("light-coral").addClass("Fz-B");
            }
            $("#modal-text-your-choice").text("You chose NO.")
            $("#btn_questionAnswer").click();
            presenters.render_close_modal();
        })

        $("#btn_next_question").click(() => {

            $("#modal_questionAnswer").modal("hide");
            console.log("current score is " + currentScore.toString())
            if (currentIndex <= totalQuestions) {
                currentIndex = currentIndex + 1;
                presenters.renderQuestion(questions.bank[shuffled_question_index[currentIndex - 1]], currentIndex);
            }

            if (currentIndex === totalQuestions + 1) {
                presenters.renderResultPage(currentScore, totalQuestions);
            }
        })

        $("#btn_next_question_on_mainpage").click(() => {
            $("#btn_next_question").click();
        })

        $("#btn_explanation").click(() => {
            $("#btn_questionAnswer").click();
        })

        $("#btn_return_home").click(()=>{
            $(location).attr('href', '/index.html');
        })
    }();
});

