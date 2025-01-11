export function renderActivitiesPage() {
  const main = document.querySelector("main");
  main.innerHTML = `<h1>Activities</h1>
    <section class="dropdown">
      <section class="breakDrop">
        <label for="breakTime" class="selection">Break Duration:</label>
        <select class="dropdown1" id="breakTime">
          <option value="">Choose One</option>
          <option value="5">Quick (5 mins)</option>
          <option value="10">Short (10 mins)</option>
          <option value="20">Medium (20 mins)</option>
          <option value="30">Long (30 mins)</option>
        </select>
      </section>

      <section class="stressDrop">
        <label for="stressLevel" class="selection">Stress Level:</label>
        <select class="dropdown1" id="stressLevel">
          <option value="">Choose One</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
      </section>

      <section class="locationDrop">
        <label for="location" class="selection">Location:</label>
        <select class="dropdown1" id="location">
          <option value="">Choose One</option>
          <option value="indoors">Indoors</option>
          <option value="outdoors">Outdoors</option>
          <option value="any">Any</option>
        </select>
      </section>
    </section>

    <div class="activities">
      <button class="generate">
        <a href="#activitiesInfo" class="generateLink">Generate Activities</a>
      </button>

      <p id="activitiesInfo">Here are the activities that we recommend:</p>

      <div class="plan-container">
        <div class="planA">
          <button class="plan">
            <h4>Plan A</h4>
            <br />
            <p>You haven't generated a plan yet!</p>
          </button>
        </div>

        <div class="planB">
          <button class="plan">
            <h4>Plan B</h4>
            <br />
            <p>You haven't generated a plan yet!</p>
          </button>
        </div>
      </div>
    </div>`;
}

export function startActivitiesLogic() {
  let activities = [];

  const fetchData = async () => {
    try {
      const response = await fetch("src/index/Activities/activities.json");
      const data = await response.json();
      activities = data.activities;
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const generateActivitiesButtons = async () => {
    await fetchData();
    console.log("generating activities");
    let generate = document.querySelector(".generate");
    generate.addEventListener("click", () => {
      const breakTime = document.getElementById("breakTime").value;
      const stressLevel = document.getElementById("stressLevel").value;
      const location = document.getElementById("location").value;

      if (!breakTime || !stressLevel || !location) {
        return;
      }

      const filteredActivities = activities.filter((activity) => {
        const isBreakTimeValid =
          !breakTime || activity.length.includes(breakTime);

        const isStressLevelValid =
          !stressLevel || activity.stress.includes(stressLevel);

        const isLocationValid =
          !location ||
          location === "any" ||
          (location === "indoors" &&
            (activity.location.includes("home") ||
              activity.location.includes("school") ||
              activity.location.includes("cafe") ||
              activity.location.includes("library"))) ||
          (location === "outdoors" && activity.location.includes("outdoors"));

        return isBreakTimeValid && isStressLevelValid && isLocationValid;
      });

      const shuffleArray = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
      };
      shuffleArray(filteredActivities);

      const planA = document.querySelector(".planA button");
      const planB = document.querySelector(".planB button");

      if (filteredActivities.length > 1) {
        const activityA = filteredActivities[0];
        const activityB = filteredActivities[1];

        planA.innerHTML = `<u><h4>Plan A</h4></u><br /><p class='activity'>${activityA.name}</p> <br/> <p>Duration: ${breakTime} minutes</p>`;
        planB.innerHTML = `<u><h4>Plan B</h4></u><br /><p class='activity'>${activityB.name}</p> <br/> <p>Duration: ${breakTime} minutes</p>`;
      } else if (filteredActivities.length === 1) {
        const activityA = filteredActivities[0];

        planA.innerHTML = `<u><h4>Plan A</h4></u><br /><p class='activity'>${activityA.name}</p> <br/> <p>Duration: ${breakTime} minutes</p>`;
        planB.innerHTML = `<u><h4>Plan B</h4></u><br /><p class='activity'>${activityA.name}</p> <br/> <p>Duration: ${breakTime} minutes</p>`;
      } else {
        planA.innerHTML = `<u><h4>Plan A</h4></u><br /><p class='activity'>No activities available for your selection.</p>`;
        planB.innerHTML = `<u><h4>Plan B</h4></u><br /><p class='activity'>No activities available for your selection.</p>`;
      }
      
      generate.innerHTML = "Regenerate Activities <i class='fa-solid fa-arrows-rotate'></i>"
      
    });
  };

  generateActivitiesButtons();

  document.querySelectorAll(".plan").forEach((button) => {
    button.addEventListener("click", () => {
      let duration;
      let activity;

      const button_string = button.textContent;
      console.log(button_string);

      let number = button_string.match(/\d+/);
      console.log(number);
      if (number) {
        duration = parseInt(number[0], 10);
        duration *= 60;
      }
      console.log(duration);

      let startIndex = button_string.indexOf("Plan");
      startIndex += "Plan A".length;

      const endIndex = button_string.indexOf("Duration", startIndex);

      activity = button_string.slice(startIndex, endIndex).trim();
      console.log(activity);

      if (duration !== undefined && activity !== null) {
        localStorage.setItem("duration", duration);
        localStorage.setItem("activity", activity);
        window.location.href = "?page=timer";
      }
    });
  });
}
