// Questions for each level
var easyQuestions = [
    {
        question: "What is the capital of Italy?",
        options: ["Paris", "London", "Berlin", "Rome"],
        correctAnswerIndex: 3,
    },
    {
        question: "What is 5 + 5?",
        options: ["8", "10", "12", "15"],
        correctAnswerIndex: 1,
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
        correctAnswerIndex: 0,
    },
    {
        question: "What is the chemical symbol for sodium?",
        options: ["S", "Na", "N", "Sn"],
        correctAnswerIndex: 1,
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Oscar Wilde", "George Bernard Shaw", "Jane Austen"],
        correctAnswerIndex: 0,
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        correctAnswerIndex: 2,
    },
    {
        question: "What is the square root of 144?",
        options: ["10", "12", "14", "16"],
        correctAnswerIndex: 1,
    },
    {
        question: "Who discovered penicillin?",
        options: ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Jonas Salk"],
        correctAnswerIndex: 0,
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswerIndex: 1,
    },
    {
        question: "What is the currency of Japan?",
        options: ["Yuan", "Yen", "Euro", "Dollar"],
        correctAnswerIndex: 1,
    },
];
var mediumQuestions = [
    {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"],
        correctAnswerIndex: 1,
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "O2", "H2SO4"],
        correctAnswerIndex: 0,
    },
    {
        question: "Who discovered gravity?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
        correctAnswerIndex: 0,
    },
    {
        question: "What is the boiling point of water in Celsius?",
        options: ["100°C", "0°C", "-100°C", "50°C"],
        correctAnswerIndex: 0,
    },
    {
        question: "Who is the author of 'The Great Gatsby'?",
        options: ["F. Scott Fitzgerald", "Ernest Hemingway", "Mark Twain", "J.D. Salinger"],
        correctAnswerIndex: 0,
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Au", "Fe", "Pb"],
        correctAnswerIndex: 1,
    },
    {
        question: "What is the main ingredient in guacamole?",
        options: ["Tomato", "Avocado", "Onion", "Lemon"],
        correctAnswerIndex: 1,
    },
    {
        question: "Which country is known for producing tea?",
        options: ["China", "India", "Japan", "Brazil"],
        correctAnswerIndex: 1,
    },
    {
        question: "Who painted 'Starry Night'?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        correctAnswerIndex: 0,
    },
    {
        question: "What is the chemical symbol for carbon?",
        options: ["C", "Ca", "Co", "Cu"],
        correctAnswerIndex: 0,
    },
];
var hardQuestions = [
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Stephen King"],
        correctAnswerIndex: 0,
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Jupiter", "Saturn", "Neptune", "Mars"],
        correctAnswerIndex: 0,
    },
    {
        question: "Who discovered the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
        correctAnswerIndex: 1,
    },
    {
        question: "What is the chemical symbol for silver?",
        options: ["Ag", "Au", "Fe", "Pb"],
        correctAnswerIndex: 0,
    },
    {
        question: "Who was the first woman to win a Nobel Prize?",
        options: ["Marie Curie", "Rosalind Franklin", "Dorothy Hodgkin", "Barbara McClintock"],
        correctAnswerIndex: 0,
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Blue Whale", "Elephant", "Giraffe", "Hippopotamus"],
        correctAnswerIndex: 0,
    },
    {
        question: "Who composed 'Symphony No. 9'?",
        options: ["Ludwig van Beethoven", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Franz Schubert"],
        correctAnswerIndex: 0,
    },
    {
        question: "Which gas makes up the largest percentage of the Earth's atmosphere?",
        options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Argon"],
        correctAnswerIndex: 0,
    },
    {
        question: "Who founded Microsoft?",
        options: ["Bill Gates", "Steve Jobs", "Larry Page", "Mark Zuckerberg"],
        correctAnswerIndex: 0,
    },
    {
        question: "What is the chemical symbol for uranium?",
        options: ["U", "Ur", "Un", "Us"],
        correctAnswerIndex: 0,
    },
];
// Function to shuffle an array
function shuffleArray(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
    return array;
}
// Function to select random questions of a given level
function selectRandomQuestions(level, count) {
    var questions;
    switch (level) {
        case "easy":
            questions = shuffleArray(easyQuestions).slice(0, count);
            break;
        case "medium":
            questions = shuffleArray(mediumQuestions).slice(0, count);
            break;
        case "hard":
            questions = shuffleArray(hardQuestions).slice(0, count);
            break;
    }
    return questions;
}
// HTML UI
// HTML UI
var questionsContainer = document.getElementById("questions-container");
var submitButton = document.getElementById("submit-button");
// Check if questionsContainer and submitButton are not null
if (questionsContainer && submitButton) {
    // Main quiz logic
    var currentLevel_1 = "medium"; // Start with medium level
    var currentQuestions_1 = selectRandomQuestions(currentLevel_1, 6);
    // Function to render questions
    function renderQuestions(questions) {
        questionsContainer.innerHTML = ""; // Clear previous questions
        questions.forEach(function (question, index) {
            var questionElement = document.createElement("div");
            questionElement.innerHTML = "\n          <p>".concat(index + 1, ". ").concat(question.question, "</p>\n          <ul>\n            ").concat(question.options.map(function (option, optionIndex) { return "\n              <li>\n                <label>\n                  <input type=\"radio\" name=\"question".concat(index, "\" value=\"").concat(optionIndex, "\">\n                  ").concat(option, "\n                </label>\n              </li>\n            "); }).join(''), "\n          </ul>\n        ");
            questionsContainer.appendChild(questionElement);
        });
    }
    // Event listener for submit button
    submitButton.addEventListener("click", function () {
        var selectedAnswers = [];
        currentQuestions_1.forEach(function (_, index) {
            var selectedOption = document.querySelector("input[name=\"question".concat(index, "\"]:checked"));
            if (selectedOption) {
                selectedAnswers.push(parseInt(selectedOption.value));
            }
        });
        // Calculate score
        var score = selectedAnswers.reduce(function (acc, answer, index) {
            return answer === currentQuestions_1[index].correctAnswerIndex ? acc + 1 : acc;
        }, 0);
        // Decide next level based on score
        if (score < 3) {
            currentLevel_1 = "easy";
        }
        else {
            currentLevel_1 = "hard";
        }
        // Select next set of questions
        currentQuestions_1 = selectRandomQuestions(currentLevel_1, 6);
        // Render next set of questions
        renderQuestions(currentQuestions_1);
    });
    // Initial render
    renderQuestions(currentQuestions_1);
}
else {
    console.error("questionsContainer or submitButton is null.");
}
