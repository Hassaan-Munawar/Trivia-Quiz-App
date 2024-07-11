var questions;
fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple')
    .then(data => data.json())
    .then((data) => {
        var quest = data.results.map((q, i) => ({
            question: q.question,
            options: shuffle([...q.incorrect_answers, q.correct_answer]),
            correctOption: q.correct_answer
        }));

        questions = quest;
        nextQuestion();
    })
    .catch(console.log);

var interval;
var getmin = document.getElementById('min');
var getsec = document.getElementById('sec');
var min = 1;
var sec = 60;
var arr;

interval = setInterval(function () {
    sec--;
    getsec.innerHTML = sec;
    if (sec < 0) {
        min--;
        getmin.innerHTML = min;
        sec = 60;
        getsec.innerHTML = sec;
    } else if (min == 0 && sec == 0) {
        arr = score;
        sessionStorage.setItem('score', arr);
        sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));
        location.href = 'result.html';
    }
}, 1000);

setTimeout(function () {
    clearInterval(interval);
}, 121000);

var index = 0;
var score = 0;
var userAnswers = [];

function nextQuestion() {
    if (index > 0) {
        var selectedOption = document.querySelector('input[name="ans"]:checked');
        if (selectedOption) {
            var selectedAnswer = selectedOption.value;
            var correctAnswer = questions[index - 1].correctOption;
            userAnswers.push({ question: questions[index - 1].question, selectedAnswer, correctAnswer });

            if (selectedAnswer === correctAnswer) {
                score++;
            }
        }
    }

    if (index >= questions.length) {
        sessionStorage.setItem('score', score);
        sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));
        location.href = 'result.html';
        return;
    }

    var currentQuestion = questions[index];
    document.getElementById('question').innerText = currentQuestion.question;
    document.getElementById('opt1').innerText = currentQuestion.options[0];
    document.getElementById('opt2').innerText = currentQuestion.options[1];
    document.getElementById('opt3').innerText = currentQuestion.options[2];
    document.getElementById('opt4').innerText = currentQuestion.options[3];

    var options = document.getElementsByName('ans');
    options.forEach(opt => opt.checked = false);
    options.forEach((opt, i) => opt.value = currentQuestion.options[i]);

    index++;
}

function btnClick() {
    document.getElementById('btn').disabled = false;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
