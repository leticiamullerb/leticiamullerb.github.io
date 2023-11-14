window.onload = init;



let currentQuestion = 0;
let scoreGlobal = 0;
let shuffledQuestions;
//const startBtn = document.getElementById('startQuizz')

let tableauQuestions = [ 
    {
    question: "In Jurassic Parc, what does John Hammond have in the top of his walking stick?",
    answers: ["A mosquito", "An ant", "A bacteria"],
    correctAnswer: 0,
    image : "https://upload.wikimedia.org/wikipedia/fr/6/6a/Jurassic_Park_logo.svg",
    largeurImage: "500px",
    score:1,
    type: 'singleChoice'
    },
    {
    question: "Jack and Rose could have both fitted on the “door” and survived together.",
    answers: ["True", "False"],
    correctAnswer: 1,
    image: "/Users/leti/Documents/GitHub/leticiamullerb.github.io/Libs/titanic.jpg.webp",
    largeurImage: "500px",
    score:1,
    type: 'singleChoice'
    },
    {
    question: "No Star Wars was released in the 90’s :",
    answers: ["True", "False"],
    correctAnswer: 1,

    // function vidéo à ajouter 

    image: "/Users/leti/Documents/GitHub/leticiamullerb.github.io/Libs/starwars.svg.png",
    largeurImage: "500px",
    score:1,
    type: 'singleChoice'
    },
    {
    question: "What are the Fight Club’s rules ?",
    answers: ["You do not talk about Fight Club.", "I know it because Tyler knows it.", "Only two guys to a fight."],
    correctAnswers: [0, 2],
    image: "/Users/leti/Documents/GitHub/leticiamullerb.github.io/Libs/fight club.jpg",
    largeurImage: "500px",
    score:2,

    // voir comment diviser le score si seulement une des deux réponses justes

    type: 'multipleChoiceQuestion'
    },
];

//questions et images encore à ajouter 


function init() {
    console.log("Page is ready, elements displayed, and resources that can take time ready too (videos)")
    const startButton = document.querySelector('#startQuizz');
    startButton.onclick = startQuizz;
}

function startQuizz() {
    console.log("startQuizz");
    shuffledQuestions = tableauQuestions.sort(() => Math.random() - .5)
    currentQuestion = 0;
    displayQuestion(currentQuestion);
    //startBtn.style.visibility= 'invisible'; 
    //document.querySelector('#startQuizz').innerText = "Next";
}


function displayQuestion(currentQuestion) {
    // TODO : check the type of question....


    let questionDiv = document.querySelector('#questionDiv');
    questionDiv.innerHTML = "";
    
    let imgElement = document.createElement('img');
    imgElement.src = tableauQuestions[currentQuestion].image; 
    imgElement.style.width = tableauQuestions[currentQuestion].largeurImage;
    imgElement.style.margin = 'auto';
    imgElement.style.display = 'block';
    imgElement.style.border = '20px solid white';
    imgElement.style.borderRadius = '150px';
    questionDiv.append(imgElement);

    // we display the title of the question
    let questionTitle = document.createElement('h2');
    questionTitle.innerHTML = tableauQuestions[currentQuestion].question;
    questionDiv.append(questionTitle);

    // add a button for each possible answer
    let answerDiv = document.createElement('div');
    answerDiv.id = "answerDiv";
    questionDiv.append(answerDiv);
    
    answerDiv.innerHTML = "";
    /* we could have written the for loop below like that 
    tableauQuestions.forEach((question, index) => {
    });
    */

    for (let i = 0; i < tableauQuestions[currentQuestion].answers.length; i++) {
        let answerButton = document.createElement('button');
        answerButton.id = i;
        // on ajoute la classe CSS answerButton
        answerButton.classList.add("answerButton");

        answerButton.innerHTML = tableauQuestions[currentQuestion].answers[i];
        answerDiv.append(answerButton);

        answerButton.onclick = (evt) => {
            // we get the button that was clicked
            let button = evt.target;
            // its id is the index of the answer in the array

            // check if this was the right answer
            if(tableauQuestions[currentQuestion].correctAnswer === parseInt(button.id)) {
                scoreGlobal++;
                let scoreDiv = document.querySelector('#divScore');
                scoreDiv.innerHTML = "Score : " + scoreGlobal;
                document.body.innerHTML += 'Correct answer!';
            } else {
                document.body.innerHTML += 'Wrong answer!';
            }

            // comment réinitialiser le feedback d'une question à l'autre ?
            
            currentQuestion++;

            // check if we have another question to display
            //if(currentQuestion < tableauQuestions.length) {

            if (shuffledQuestions.length > currentQuestion ) {
                displayQuestion(currentQuestion);
            } else {
                gameOver();
            }
        };
    } 
}

function gameOver() {
    let questionDiv = document.querySelector('#questionDiv');
    questionDiv.innerHTML = "";
    questionDiv.innerHTML = "You are done ! Your final score is : " + scoreGlobal;
    document.querySelector('#startQuizz').innerText = "Play Again";
}