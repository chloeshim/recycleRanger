$(() => {
    /* UI */
    class Questions {
        bank = [
            {
                text:    "1Do you take off the lids when you recycle a plastic water bottle?",
                answer:    true,
                explanation: "t",
            },
            {
                text:    "2 hit false",
                answer:    false,
                explanation: "f",
            },
            {
                text:    "3 hit yes",
                answer:    true,
                explanation: "t",
            },
            {
                text:    "4 hit yes",
                answer:    true,
                explanation: "t",
            }

        ];
    }

    class Presenters {
        displayItem(objectID){
            $("#"+objectID).removeClass("D-n");
        }

        hideItem(objectID){
            $("#"+objectID).addClass("D-n");
        }

        renderQuestion(question, currentIndex){
            const questionText = currentIndex.toString() +". " + question.text;
            $("#question_text").text(questionText);
            $("#modal-text").text(question.explanation)
            this.displayItem("btngrp_answers");
            this.hideItem("btngrp_next_page");

        }
        shuffle() {
            var array = [0,1,2,3];
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
        render_close_modal(){
            this.hideItem("btngrp_answers")
            this.displayItem("btngrp_next_page");
        }
        renderResultPage(){

        }

    }

    /* Client */
    const quizClient = function () {
        var currentScore = 0;
        var currentIndex = 1;
        const presenters = new Presenters();
        const questions = new Questions();
        const shuffled_question_index = presenters.shuffle();

        presenters.renderQuestion(questions.bank[shuffled_question_index[0]],currentIndex);

        console.log("ho");

        $("#btn_yes").click(()=>{
            console.log("hit yes");
            if(questions.bank[shuffled_question_index[currentIndex-1]].answer === true){
                $("#modal-title").text("Correct");
                currentScore += 1;
            } else {
                $("#modal-title").text("Incorrect");
            }
            $("#btn_questionAnswer").click();
            presenters.render_close_modal();
        })

        $("#btn_no").click(()=>{
            console.log("hit no");
            if(questions.bank[shuffled_question_index[currentIndex-1]].answer === false){
                $("#modal-title").text("Correct");
                currentScore += 1;
            } else {
                $("#modal-title").text("Incorrect");
            }
            $("#btn_questionAnswer").click();
            presenters.render_close_modal();
        })

        $("#btn_next_question").click(()=>{
            currentIndex = currentIndex +1;
            presenters.renderQuestion(questions.bank[shuffled_question_index[currentIndex-1]],currentIndex);
            $("#modal_questionAnswer").modal("hide");
            console.log("current score is " + currentScore.toString())
        })

        $("#btn_next_question_on_mainpage").click(()=>{
            $("#btn_next_question").click();
        })

        $("#btn_explanation").click(()=>{
            $("#btn_questionAnswer").click();
        })
    }();
});

