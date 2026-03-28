const container = document.getElementById("questionsContainer");
const title = localStorage.getItem("paperTitle");
document.getElementById("paperTitle").innerText = title;


// Simulated AI questions (for demo)
const questions = [
  {
    question: "What is 2 + 2?",
    options: ["2", "3", "4", "5"],
    answer: "4"
  },
  {
    question: "Which is a programming language?",
    options: ["HTML", "Python", "CSS", "Photoshop"],
    answer: "Python"
  }
];

// Load questions
function loadQuestions() {
  container.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question";

    let optionsHTML = "";

    q.options.forEach(opt => {
      optionsHTML += `<div class="option" onclick="checkAnswer(this, '${opt}', '${q.answer}')">${opt}</div>`;
    });

    div.innerHTML = `
      <h3>${index + 1}. ${q.question}</h3>
      ${optionsHTML}
    `;

    container.appendChild(div);
  });
}

function checkAnswer(element, selected, correct) {
  const options = element.parentElement.querySelectorAll(".option");

  options.forEach(opt => opt.classList.remove("correct", "wrong"));

  if (selected === correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");

    options.forEach(opt => {
      if (opt.innerText === correct) {
        opt.classList.add("correct");
      }
    });
  }
}

function goBack() {
  window.location.href = "index.html";
}

loadQuestions();