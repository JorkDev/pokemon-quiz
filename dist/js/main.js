// getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeOff = quiz_box.querySelector("header .time_text")
const timeSubText = quiz_box.querySelector("section .que_subtext")

// if start quiz button is clicked
start_btn.onclick = () =>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuestions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(14); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    next_btn.classList.remove("show"); //hide the next button
    timeOff.textContent = "Time Left"
    timeSubText.textContent = "PICK ONE OF THE FOLLOWING OPTIONS";
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuestions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        next_btn.style.display = "none"; //hide the next button
        timeOff.textContent = "Time Left"
        timeSubText.textContent = "PICK ONE OF THE FOLLOWING OPTIONS";
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResultBox(); //calling showResult function
    }
}
//getting questions and options from array
function showQuestions(index){
    const pkm_img = document.querySelector(".pokemon_img");
    pkm_img.classList.add("blur")
    const option_list = document.querySelector(".option_list");
    let pkm_post = '<img src='+ questions[index].img +'>'
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
                   + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
                   + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
                   + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    pkm_img.innerHTML = pkm_post;
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onClick", "optionSelected(this)");
    }
}

// creating the new div tags which for icons
let correctIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let wrongIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>'

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correctAns = questions[que_count].name; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    const pkm_img = document.querySelector(".pokemon_img");
    if(userAns == correctAns){
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", correctIcon); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
        pkm_img.classList.remove("blur");
        timeSubText.textContent = "CORRECT OPTION, CLICK ON NEXT QUESTION";

    }else{
        console.log('Wrong asnwer')
        answer.classList.add("wrong");
        pkm_img.classList.remove("blur")
        answer.insertAdjacentHTML("beforeend", wrongIcon);
        timeSubText.textContent = "WRONG OPTION, THE CORRECT ONE WAS";

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correctAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", correctIcon); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }

    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }

    next_btn.style.display = "block"; //show the next button if user selected any option
}

function showResultBox(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //show quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 3){
        let scoreTag = '<span>Congratulations, you got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>Sorry, you got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }


}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeCount.textContent = "00"; //change the time text to time off
            timeSubText.textContent = "TIME'S UP, THE CORRECT ANSWER WAS"
            const allOptions = option_list.children.length; //getting all option items
            let correctAns = questions[que_count].name; //getting correct name from array
            
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correctAns){ //if there is an option which is matched to an array name
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", correctIcon); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }

            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            
            next_btn.style.display = "block"; //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 28);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}


function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuestionCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuestionCountTag;
}