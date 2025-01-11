export function renderTimerPage() {
  const main = document.querySelector("main");
  main.innerHTML = `
    <div id="timer">
      <h1>Timer</h1>
      <div class="flex-container">
        <div class="titling">
          <h2 id="active-title">
            Your Chosen Break Activity:
            <span id="activity" style="color: white">No chosen activity</span>
          </h2>
          <p id="footnote">
            <a href="index.html#learn-more">ⓘ Why is taking a break important?</a>
          </p>
        </div>
        <div id="large-timer">
          ${renderBuddy()}
          <div id="timer-block">
            <div id="active-timer" class="timer">
              00:00
            </div>
            <div id="buttons">
              <button id="pause">Play</button>
              <button id="done">Done</button>
            </div>
          </div>
        </div>
        <div class="titling">
          <h2>Up Next:</h2>
          <h3 id="next-title">Study Timer:</h3>
        </div>
        <div class="next-container visible">
          <div id="static-timer" class="timer">
            00:00
          </div>
          <div id="dropdown">
            <label for="studyTime" class="selection">Study Duration:</label>
            <select class="dropdown1" id="studyTime">
              <option value="">Choose One</option>
              <option value="5">5 mins</option>
              <option value="10">10 mins</option>
              <option value="15">15 mins</option>
              <option value="20">20 mins</option>
              <option value="25">25 mins</option>
              <option value="30">30 mins</option>
              <option value="35">35 mins</option>
              <option value="40">40 mins</option>
              <option value="45">45 mins</option>
              <option value="50">50 mins</option>
              <option value="55">55 mins</option>
              <option value="60">60 mins</option>
            </select>
          </div>
        </div>
        <div class="return-container">
          <button id="return">Return</button>
        </div>
      </div>
    </div>`;
}

function renderBuddy() {
  let currentProfilePic =
    localStorage.getItem("currentProfilePic") ||
    "https://cdn.glitch.global/3774e2e9-58a5-41b3-9d45-62c8b63bc41c/Pink.png?v=1731989501902";
  let currentAccessory =
    localStorage.getItem("currentAccessory") ||
    "https://cdn.glitch.global/3774e2e9-58a5-41b3-9d45-62c8b63bc41c/empty_overlay.png?v=1732774686767";

  return `                <div class="avatar-container">
      <img src="${currentProfilePic}"
          class="profile-pic" alt="Avatar">
      <img src="${currentAccessory}"
          class="accessory" alt="Accessory">
    </div>`;
}

export function startTimerLogic() {
  function startTimer(duration) {
    const timer = document.getElementById("active-timer");
    const stop = document.getElementById("pause");
    const done = document.getElementById("done");
    const return_button = document.getElementById("return");
    const dropdown = document.getElementById("studyTime");
    const static_timer = document.getElementById("static-timer");
    const nextContainer = document.querySelector(".next-container");
    const returnContainer = document.querySelector(".return-container");
    const next_title = document.getElementById("next-title");
    const active_title = document.getElementById("active-title");
    const footnote = document.getElementById("footnote");
    let timeLeft = duration;
    let timerInterval;
    let timerRunning = false;

    function updateTimer() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;

      timer.textContent = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;

      if (timeLeft > 0) {
        timeLeft -= 1;

        let totalTimeSpent =
          parseInt(localStorage.getItem("totalTimeSpent")) || 0;
        totalTimeSpent += 1;
        localStorage.setItem("totalTimeSpent", totalTimeSpent);
      } else {
        clearInterval(timerInterval);

        let totalBreaks = parseInt(localStorage.getItem("totalBreaks")) || 0;
        totalBreaks += 1;
        localStorage.setItem("totalBreaks", totalBreaks);

        updateFavoriteBreaks(chosen_activity);
      }
    }
    
    dropdown.addEventListener("change", function () {
      setTimer("static-timer", dropdown.value*60);
    });

    stop.addEventListener("click", function () {
      if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
        stop.textContent = "Play";
      } else {
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
        timerRunning = true;
        stop.textContent = "Pause";
      }
    });

    done.addEventListener("click", function () {
      if (done.textContent == "Done") {
        if (timer.textContent !== "00:00") {
          let totalBreaks = parseInt(localStorage.getItem("totalBreaks")) || 0;
          totalBreaks += 1;
          localStorage.setItem("totalBreaks", totalBreaks);
          updateFavoriteBreaks(chosen_activity);
        }

        clearInterval(timerInterval);
        timeLeft = 0;
        timerRunning = false;
        done.textContent = "Next";
        timer.textContent = `00:00`;
        localStorage.removeItem("activity");
      } else { // is "Next"
        let new_duration = dropdown.value * 60;
        setTimer("active-timer", new_duration);
        timeLeft = new_duration;
        done.textContent = "Done";
        stop.textContent = "Play";
        nextContainer.classList.toggle("visible");
        returnContainer.classList.toggle("visible");
        active_title.textContent = "Study Time!"
        footnote.classList.toggle("hidden");
        next_title.textContent = "Return to Activities page to select new activity:"
      }
    });
    
    return_button.addEventListener("click", function () {
      window.location.href = "?page=activities";
    });
  }

  function setTimer(id, duration) {
    const timer = document.getElementById(id);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    timer.textContent = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }

  function setActivity(activity) {
    const activity_block = document.getElementById("activity");
    if (activity) {
      activity_block.textContent = `${activity}`;
    }
  }

  const chosen_activity = localStorage.getItem("activity");
  setActivity(chosen_activity);

  const timer_duration = localStorage.getItem("duration");
  console.log("timer duration: ", timer_duration);
  if (timer_duration !== "NaN") {
    setTimer("active-timer", timer_duration);
    startTimer(timer_duration);
  } else {
    setTimer("active-timer", 0);
    startTimer(0);
  }

  localStorage.removeItem("duration");
}

function updateFavoriteBreaks(activity) {
  let favoriteBreaks = JSON.parse(localStorage.getItem("favoriteBreaks")) || [];

  favoriteBreaks = favoriteBreaks.filter((item) => item.name != null);

  if (!favoriteBreaks) {
    favoriteBreaks = [];
  }

  let findBreak = favoriteBreaks.find((b) => b.name == activity);
  let frequency = 0;
  if (findBreak) {
    findBreak.frequency += 1;
    // frequency = findBreak.frequency;
  } else {
    frequency = 1;
    favoriteBreaks.push({ name: activity, frequency: frequency });
  }

  localStorage.setItem("favoriteBreaks", JSON.stringify(favoriteBreaks));
  console.log(favoriteBreaks);
}
