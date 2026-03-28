const papers = [
  {
    title: "Math 123 Past Questions",
    level: "200",
    category: "Past Questions",
    year: "2023"
  },
  {
    title: "Computer Science 101 IA",
    level: "100",
    category: "IAs",
    year: "2024"
  }
];

const container = document.getElementById("papersContainer");

function displayPapers(data) {
  container.innerHTML = "";

  data.forEach(paper => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${paper.title}</h3>
      <p>Level ${paper.level} | ${paper.category} | ${paper.year}</p>
      <button onclick="viewPaper('${paper.title}')">View</button>
      <button onclick="downloadPaper()">Download</button>
      <button onclick="practiceAI('${paper.title}')" style="background: white; color: black; font-weight: bold; border: 1px solid #ccc;">Practice AI</button>
    `;

    container.appendChild(card);
  });
}

document.getElementById("search").addEventListener("input", filterPapers);
document.getElementById("levelFilter").addEventListener("change", filterPapers);
document.getElementById("categoryFilter").addEventListener("change", filterPapers);
document.getElementById("yearFilter").addEventListener("change", filterPapers);

function filterPapers() {
  const search = document.getElementById("search").value.toLowerCase();
  const level = document.getElementById("levelFilter").value;
  const category = document.getElementById("categoryFilter").value;
  const year = document.getElementById("yearFilter").value;

  const filtered = papers.filter(p => {
    return (
      p.title.toLowerCase().includes(search) &&
      (level === "" || p.level === level) &&
      (category === "" || p.category === category) &&
      (year === "" || p.year === year)
    );
  });

  if (filtered.length === 0) {
    container.innerHTML = "<p> Oops Sorry, no papers found!. <br> Try adjusting your filters.</p>";
  } else {
    displayPapers(filtered); 
    function displayPapers(papersToDisplay) {
      const container = document.getElementById("papersContainer");
      container.innerHTML = "";

      papersToDisplay.forEach(paper => {
         const div = document.createElement("div");
         div.className = "card";

         div.innerHTML = `
            <h3>${paper.title}</h3>

            <p>
            <span class="badge">${paper.level}</span>
            <span class="badge">${paper.category}</span>
            <span class="badge">${paper.year}</span>
            </p>

            <button onclick="viewPaper('${paper.title}')">View</button>
            <button onclick="downloadPaper('${paper.title}')">Download</button>
            <button onclick="practiceAI('${paper.title}')" style="background: gold; color: black; font-weight: bold;">Practice AI</button>
         `;

    container.appendChild(div);
  });
}
  }
  
}

function viewPaper(title) {
  alert("Opening " + title);
}

function downloadPaper() {
  alert("Downloading...");
}

function practiceAI(title) {
  localStorage.setItem("paperTitle", title);
  window.location.href = "practice.html";
}


const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.innerText = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
});
displayPapers(papers);