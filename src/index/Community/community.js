export function renderCommunityPage() {
  const main = document.querySelector("main");
  main.innerHTML = `<div class="community">
      <div class="container">
      <h1>Community</h1>
        <section class=challenges-section>
          <h2>Challenges</h2>
          <div class="challenges">
                      <div class="challenge">
              <button class="task" point-value="10">
                <h4>Daily Task:</h4>
                Take a walk during your break. (0/1) <br /><br />
                <u>Collect 10 points</u>
              </button>
            </div>

            <div class="challenge">
              <button class="task" point-value="5">
                <h4>Daily Task:</h4>
                Respond to another buddy's question. (0/1) <br /><br />
                <u>Collect 5 points</u>
              </button>
            </div>

            <div class="challenge">
              <button class="task" point-value="15">
                <h4>Daily Task:</h4>
                Reach a study streak of 3. (0/1) <br /><br />
                <u>Collect 15 points</u>
              </button>
            </div>
          </div>
        </section>
        
        <button class="refresh-tasks">Refresh Tasks <i class="fa-solid fa-arrows-rotate"></i></button>
        
        <h2 class="points_counter">
          Points: <span id="points">0</span>
        </h2>

        <h2 class="ask">Ask and Answer</h2>
        <section class="ask_and_answer">
          <h3>How do you stay organized?</h3>
          <hr />

          <div class="userAnswers">
            <p><u>BlueGiraffe</u> says</p>
            <p class="answer">
              Utilizing a good app or website to keep track of time has been
              useful for me. I like to use Google Calendar so that I know when
              my classes, extracurriculars, and errands are scheduled. It's also
              helped me to color code different events so that I can mentally
              group things when I check my calendar. Plus, it gives you
              reminders 10 minutes before an event!
            </p>

            <p><u>OrangePanda</u> says</p>
            <p class="answer">
              I use this website called Notion to keep track of when my
              assignments are due. There's tons of free templates for designs
              and plugins, which makes it really personalizable and
              customizable. I use a template that lets me list out every
              assignment, their due date, and a brief description, which I grab
              from the syllabus of each of my classes. Then, it automatically
              puts reminders into a calendar for me so that I know what
              assignments I have upcoming for the week, and also the month.
            </p>
          </div>
        </section>
        
        <textarea id="userResponse"></textarea>

        <button id="answerButton">Click to Answer</button>
      </div>
    </div>`;
}

export function startCommunityLogic() {
  const pointsDisplay = document.getElementById("points");
  const challengeButtons = document.querySelectorAll(".challenges > div");
  const answerButton = document.getElementById("answerButton");
  const userResponseInput = document.getElementById("userResponse");

  let totalPoints = parseInt(localStorage.getItem("totalPoints"), 10) || 0;
  let tasks = [];

  pointsDisplay.textContent = totalPoints;

  const fetchTasks = async () => {
    try {
      const response = await fetch("src/index/Community/community_tasks.json");
      tasks = await response.json();
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const insertTasks = (savedTasks) => {
    const challengesDiv = document.querySelector(".challenges");
    savedTasks.forEach((t, index) => {
      const challengeDiv = challengesDiv.children[index];
      const taskButton = challengeDiv.querySelector(".task");

      taskButton.innerHTML = `
          <h4>${t.name}:</h4>
          ${t.description} <br /><br />
          <u>Collect ${t.points} points</u>
      `;
      taskButton.setAttribute("point-value", t.points);

      taskButton.addEventListener("click", () => {
        const pointValue = parseInt(taskButton.getAttribute("point-value"), 10);
        totalPoints += pointValue;

        localStorage.setItem("totalPoints", totalPoints);
        pointsDisplay.textContent = totalPoints;

        const parentDiv = taskButton.parentElement;
        parentDiv.innerHTML = `<button class="refresh task"><p>Your challenge will refresh in...</p><p><span data-task="${t.name}">10:00</span></p></button>`;

        let countdown = 600;
        const countdownInterval = setInterval(() => {
          countdown--;

          let minutes = Math.floor(countdown / 60);
          let seconds = countdown % 60;

          document.querySelector(
            `span[data-task="${t.name}"]`
          ).textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
            seconds < 10 ? "0" : ""
          }${seconds}`;

          if (countdown <= 0) {
            clearInterval(countdownInterval);
            parentDiv.innerHTML = "";
            parentDiv.appendChild(renderTask(index, displayedTasks));
          }
        }, 1000);
      });
    });
  };

  const initializeSavedTasks = async () => {
    await fetchTasks();

    let savedTasks = localStorage.getItem("savedTasks") || [];

    //console.log("Savedtask is", savedTasks);

    if (savedTasks.length == 0) {
      savedTasks = [tasks[0], tasks[1], tasks[2]];
      // console.log("if statemnet worked", savedTasks);
      localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
    }

    savedTasks = localStorage.getItem("savedTasks");
    insertTasks(JSON.parse(savedTasks));
    // console.log(savedTasks);
    // console.log(localStorage.getItem("savedTasks"));
  };

  initializeSavedTasks();

  // let savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
  // // console.log(savedTasks);
  // insertTasks(savedTasks);

  const displayedTasks = new Set();
  let lastTask = tasks[0];

  const renderTask = (challengeIndex) => {
    //console.log("Rendering");
    const availableTasks = tasks.filter(
      (task) => !displayedTasks.has(task.name)
    );

    if (displayedTasks.size > 3) {
      displayedTasks.delete(lastTask.name);
    }

    const randomTask =
      availableTasks[Math.floor(Math.random() * availableTasks.length)];

    if (randomTask.name === lastTask?.name) {
      return renderTask(challengeIndex);
    }

    displayedTasks.add(randomTask.name);
    lastTask = randomTask;

    let savedTasks = JSON.parse(localStorage.getItem("savedTasks"));

    savedTasks.push(randomTask);
    //console.log(savedTasks.length);
    if (savedTasks.length > 3) {
      //console.log("shifting");
      savedTasks.shift();
    }
    console.log("Saved tasks after pushing task:", savedTasks);
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks));

    const button = document.createElement("button");
    button.className = "task";
    button.setAttribute("point-value", randomTask.points);

    button.innerHTML = `
        <u><h4>${randomTask.name}:</h4></u>
        <p>${randomTask.description}</p><br/>
        <p class="points">Collect ${randomTask.points} Points</p>
      `;

    button.addEventListener("click", () => {
      const pointValue = parseInt(button.getAttribute("point-value"), 10);
      totalPoints += pointValue;

      localStorage.setItem("totalPoints", totalPoints);
      pointsDisplay.textContent = totalPoints;

      displayedTasks.delete(randomTask.name);

      const parentDiv = button.parentElement;
      parentDiv.innerHTML = `<button class="refresh task"><p>Your challenge will refresh in...</p><p><span data-task="${randomTask.name}">10:00</span></p></button>`;

      let countdown = 600;
      const countdownInterval = setInterval(() => {
        countdown--;

        let minutes = Math.floor(countdown / 60);
        let seconds = countdown % 60;

        document.querySelector(
          `span[data-task="${randomTask.name}"]`
        ).textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
          seconds < 10 ? "0" : ""
        }${seconds}`;

        if (countdown <= 0) {
          clearInterval(countdownInterval);
          parentDiv.innerHTML = "";
          parentDiv.appendChild(renderTask(challengeIndex, displayedTasks));
        }
      }, 1000);
    });

    return button;
  };

  const refreshButton = document.querySelector(".refresh-tasks");

  refreshButton.addEventListener("click", () => {
    const challengesDiv = document.querySelector(".challenges");
    const challengeDivs = challengesDiv.querySelectorAll(".challenge");

    challengeDivs.forEach((challengeDiv, index) => {
      const currentButton = challengeDiv.querySelector(".task");
      if (
        !currentButton.textContent.includes("Your challenge will refresh in...")
      ) {
        const taskButton = renderTask(index);
        const buttonContainer = challengeDiv.querySelector(".task");
        buttonContainer.parentElement.replaceChild(taskButton, buttonContainer);
      }
    });
  });

  answerButton.addEventListener("click", () => {
    const userAnswer = userResponseInput?.value.trim();

    if (userAnswer !== "") {
      const userAnswers = document.querySelector(".userAnswers");

      const user = document.createElement("p");
      user.innerHTML = "<u>PinkFrog</u> says";

      const response = document.createElement("p");
      response.classList.add("answer");
      response.innerText = userAnswer;

      userAnswers.insertBefore(response, userAnswers.firstChild);
      userAnswers.insertBefore(user, userAnswers.firstChild);

      userResponseInput.value = "";

      document.getElementById("userResponse").style.display = "none";
      document.getElementById("answerButton").style.display = "none";
    }
  });
}
