
type Question = {
    question: string;
    options: string[];
    correctAnswerIndex: number;
  };
  
  type QuizLevel = "easy" | "medium" | "hard";
  
  
  const easyQuestions: Question[] = [
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
  
  const mediumQuestions: Question[] = [
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
  
  const hardQuestions: Question[] = [
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
  
  
  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
 
  function selectRandomQuestions(level: QuizLevel, count: number): Question[] {
    let questions: Question[];
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
  
  
    const questionsContainer = document.getElementById("questions-container")!;
    const submitButton = document.getElementById("submit-button")!;

  
  if (questionsContainer && submitButton) {
    
    let currentLevel: QuizLevel = "medium"; 
    let currentQuestions: Question[] = selectRandomQuestions(currentLevel, 6);
  
    
    function renderQuestions(questions: Question[]) {
      questionsContainer.innerHTML = ""; 
      questions.forEach((question, index) => {
        const questionElement = document.createElement("div");
        questionElement.innerHTML = `
          <p>${index + 1}. ${question.question}</p>
          <ul>
            ${question.options.map((option, optionIndex) => `
              <li>
                <label>
                  <input type="radio" name="question${index}" value="${optionIndex}">
                  ${option}
                </label>
              </li>
            `).join('')}
          </ul>
        `;
        questionsContainer.appendChild(questionElement);
      });
    }
  
    
    submitButton.addEventListener("click", () => {
      const selectedAnswers: number[] = [];
      currentQuestions.forEach((_, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
          selectedAnswers.push(parseInt((selectedOption as HTMLInputElement).value));
        }
      });
  
      
      const score = selectedAnswers.reduce((acc, answer, index) => {
        return answer === currentQuestions[index].correctAnswerIndex ? acc + 1 : acc;
      }, 0);
  
      
      if (score < 3) {
        currentLevel = "easy";
      } else {
        currentLevel = "hard";
      }
  
      
      currentQuestions = selectRandomQuestions(currentLevel, 6);
  
      
      renderQuestions(currentQuestions);
    });
  
    
    renderQuestions(currentQuestions);
  } else {
    console.error("questionsContainer or submitButton is null.");
  }
  