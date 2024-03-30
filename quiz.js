
  // Fake authentication
  let isAuthenticated = false;

  // Quiz questions and answers
  const quiz = [
    {
      question: "What does the `typeof` operator return when used with `null`?",
      options: ["null", "object", "undefined", "Ronumberme"],
      correctAnswer: "object"
    },
    {
      question: "Which built-in method in JavaScript is used to sort the elements of an array?",
      options: ["sort()", "sorted()", "order()", "arrange()"],
      correctAnswer: "sort()"
    },
    {
      question: "What is the What keyword is used to declare a variable in JavaScript?",
      options: ["var", "let", "const", "int"],
      correctAnswer: "var"
    },
    {
      question: "What is the correct way to write an IF statement in JavaScript?",
      options: ["if (condition) { // code }", "if {condition} // code", " IF (condition) THEN // code", " IF condition THEN // code"],
      correctAnswer: " if (condition) { // code }"
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  function authenticateUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Fake authentication check
    if (username === "m" && password === "m") {
      isAuthenticated = true;
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('quizContainerWrapper').style.display = 'block';
      showQuestion();
    } else {
      alert("Invalid username or password. Please try again.");
    }
  }

  function showQuestion() {
    if (!isAuthenticated) return;

    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const progressElement = document.getElementById('progress');

    if (currentQuestion >= quiz.length) {
      questionElement.innerHTML = `Quiz Completed! Your Score: ${score}/${quiz.length}`;
      optionsElement.innerHTML = '';
      document.getElementById('nextBtn').style.display = 'none';
      return;
    }

    const currentQuiz = quiz[currentQuestion];
    questionElement.textContent = currentQuiz.question;
    optionsElement.innerHTML = '';

    currentQuiz.options.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.classList.add('option');
      optionElement.textContent = option;
      optionElement.onclick = () => checkAnswer(option, currentQuiz.correctAnswer);
      optionsElement.appendChild(optionElement);
    });

    const progress = ((currentQuestion + 1) / quiz.length) * 100;
    progressElement.style.width = `${progress}%`;

    // Center the Next button
    const quizContainerWrapper = document.getElementById('quizContainerWrapper');
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.style.left = `${(quizContainerWrapper.offsetWidth - nextBtn.offsetWidth) / 2}px`;
  }

  function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
      score++;
      document.getElementById('feedback').textContent = "Correct!";
      document.getElementById('feedback').style.color = "green";
    } else {
      document.getElementById('feedback').textContent = "Incorrect!";
      document.getElementById('feedback').style.color = "red";
    }

    document.querySelectorAll('.option').forEach(option => {
      option.onclick = null;
      option.style.cursor = 'default';
    });

    document.getElementById('nextBtn').style.display = 'block';
  }

  function nextQuestion() {
    currentQuestion++;
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').style.color = "";

    showQuestion();
    document.getElementById('nextBtn').style.display = 'none'; // Hide next button after showing question
  }


