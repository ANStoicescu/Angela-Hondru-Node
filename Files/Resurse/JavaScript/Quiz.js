var myQuestions = [
{
    question: "In ce an sa nascut Angela Hondru?",
    answers: {
         a: ['1945', false],
         b: ['1944', true],
         c: ['1946', false]
    },
},
{
    question: "Cate carti a scris?",
    answers: {
        a: ['4', false],
        b: ['8', false],
        c: ['14', true],
        d: ['17', false]
    },
},
{
    question: "Care sunt carti scrise de Angela Hondru?",
    answers: {
        a: ['Mituri şi legende japoneze', true],
        b: ['Festivaluri japoneze', true],
        c: ['Istoria Japoniei', false]
    },
}
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {

    function showQuestions(questions, quizContainer) {
        var output = [];
        var answers;

        for (var i = 0; i < questions.length; i++) {
            answers = [];
            var letter;
            for (letter in questions[i].answers) {
                answers.push('<li>' + '<input type="checkbox" name="question' + i + '" value="' + letter + '">' + questions[i].answers[letter][0] + '</li>');
                //<li><<input type="checkbox" name="question1" value="a">a: raspunsul</li>
            }

            output.push('<ol class="question">' + questions[i].question + '</ol>' + '<ol type="a" class="answers">' + answers.join('') + '</ol>');
            //<ol class="question">intrebare</ol><ol class="answers">scrie tot answers</ol>
        }
        quizContainer.innerHTML = output.join('');
    }

    function showResults(questions, quizContainer, resultsContainer) {
        var answerContainers = quizContainer.querySelectorAll('.answers');
        var numCorrect = 0;
        
        for (let i = 0; i < questions.length; i++) {
            var userAnswer = [];
            var lg = answerContainers[i].querySelectorAll('input[name=question' + i + ']:checked').length;
            for (let j = 0; j < lg; j++)
                userAnswer.push(answerContainers[i].querySelectorAll('input[name=question' + i + ']:checked')[j].defaultValue);
            console.log(userAnswer);
            var corect = 1;
            for (let j = 0; j < lg; j++)
                if (!questions[i].answers[userAnswer[j]][1]) corect = 0;
            if (lg != 0 && corect) {
                numCorrect++;
                answerContainers[i].style.color = 'green';
            } else {
                answerContainers[i].style.color = 'red';
            }
            let letter;
            for (letter in questions[i].answers)
                document.getElementsByName('question' + i)[letter.charCodeAt(0) - 97].disabled = true;
        }

        resultsContainer.innerHTML = numCorrect + ' din ' + questions.length;
    }

    showQuestions(questions, quizContainer);

    submitButton.onclick = function () {
        showResults(questions, quizContainer, resultsContainer);
    }

}
