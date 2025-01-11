export function renderJournalPage() {
  fetch("src/index/Journal/journal.json")
    .then((response) => response.json())
    .then((journal) => {
      const genPrompts = getRandomPrompt(journal);
      renderDailyPrompt(genPrompts);
    });
}

function renderPast() {
  const pastPromptsContainer = document.getElementById("pastPrompts");
  pastPromptsContainer.innerHTML = ""; // Clear previous content

  const savedPrompts = JSON.parse(localStorage.getItem("pastPrompts")) || [];
  const savedTitles = JSON.parse(localStorage.getItem("pastTitle")) || [];

  if (savedTitles.length > 0 && savedTitles.length === savedPrompts.length) {
    savedTitles.forEach((title, index) => {
      // Create a new section for each title and prompt
      const section = document.createElement("section");
      section.className = "pastPromptsList";

      const hr = document.createElement("hr");
      
      // Create a paragraph for the title
      const titleParagraph = document.createElement("h3");
      titleParagraph.textContent = title;

      // Create a paragraph for the prompt
      const promptParagraph = document.createElement("p");
      promptParagraph.textContent = savedPrompts[index];
      promptParagraph.classList.add("response");

      // Append title and prompt to the section
      section.appendChild(titleParagraph);
      section.append(hr);
      section.appendChild(promptParagraph);

      // Append the section to the container
      pastPromptsContainer.appendChild(section);
    });
  } else {
    // Create a message indicating no entries
    const noEntriesParagraph = document.createElement("p");
    noEntriesParagraph.className = "noPastEntries";
    noEntriesParagraph.textContent = "No past entries available.";

    pastPromptsContainer.appendChild(noEntriesParagraph);
  }
}
function getRandomPrompt(prompts) {
  // Extract the array of objects
  const promptArray = prompts.prompts;

  const pastPrompts = JSON.parse(localStorage.getItem("pastTitle")) || [];
  const availablePrompts = promptArray.filter(
    (prompt) => !pastPrompts.includes(prompt.text)
  );

  if (availablePrompts.length === 0) {
    console.error("No prompts available.");
    return null; // Handle empty or invalid data
  }

  // Generates a random index
  const randomIndex = Math.floor(Math.random() * availablePrompts.length);

  // Returns the random prompt text
  return availablePrompts[randomIndex].text;
}

function togglePastPrompts() {
  const content = document.getElementById("pastPrompts");
  if (content.style.display === "none" || content.style.display === "") {
    content.style.display = "block"; // Show the section
    content.scrollIntoView({ behavior: "smooth" }); // Scroll to it
  } else {
    content.style.display = "none"; // Hide the section
  }
}

function renderDailyPrompt(genPrompts) {
  const mainSection = document.querySelector("main");
  mainSection.innerHTML = `
    <section class="journal">
      <h1>Journal</h1>
      <h2>Daily Prompt</h2>
      <h3 id="titlePrompt">${genPrompts}</h3>
      <textarea id="dailyPrompt"></textarea>
      <button id="submitPrompt">Submit</button>
    </section>
    
      <h2 id="toggleButton">
        <a href="#toggleButton" class="toggleLink">
          Past Prompts <i class="fa-solid fa-chevron-down"></i>
        </a>
      </h2>
    
    <section id="pastPrompts" style="display: none">
    </section>
  `;

  const toggleLink = mainSection.querySelector(".toggleLink");
  toggleLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    togglePastPrompts();
  });

  const submitButton = document.getElementById("submitPrompt");
  const dailyInput = document.getElementById("dailyPrompt");
  const storedPrompt = document.getElementById("titlePrompt");

  submitButton.addEventListener("click", () => {
    const response1 = dailyInput.value.trim();
    const response2 = storedPrompt.textContent;

    if (response1) {
      const pastPrompts = JSON.parse(localStorage.getItem("pastPrompts")) || [];
      pastPrompts.push(response1);
      localStorage.setItem("pastPrompts", JSON.stringify(pastPrompts));

      const pastTitle = JSON.parse(localStorage.getItem("pastTitle")) || [];
      pastTitle.push(response2);
      localStorage.setItem("pastTitle", JSON.stringify(pastTitle));

      const textarea = document.getElementById("dailyPrompt");
      textarea.readOnly = true;

      submitButton.style.display = "none";
    } else {
      alert("Please enter a response before submitting.");
    }
  });

  renderPast();
}
