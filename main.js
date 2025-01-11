import renderNav from "./src/index/Navbar/navbar.js";
import renderHomePage from "./src/index/Home/home.js";
import { startTimerLogic, renderTimerPage } from "./src/index/Timer/timer.js";
import {
  startCommunityLogic,
  renderCommunityPage,
} from "./src/index/Community/community.js";
import {
  startActivitiesLogic,
  renderActivitiesPage,
} from "./src/index/Activities/activities.js";
import { renderJournalPage } from "./src/index/Journal/journal.js";
import {
  startProfileLogic,
  renderProfilePage,
} from "./src/index/Profile/profile.js";
import renderLoginPage from "./src/index/Login/login.js";
import renderRegisterPage from "./src/index/Register/register.js";


// Rendering begins here
const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get("page");

const stylesheetLink = document.getElementById("dynamic-stylesheet");
preload_image(
  "https://cdn.glitch.global/3774e2e9-58a5-41b3-9d45-62c8b63bc41c/breakBuddy%20(1).png?v=1732571661167"
);

function loadStylesheet(href, callback) {
  const existingLink = document.querySelector('link[data-dynamic="true"]');

  if (existingLink) {
    existingLink.remove();
  }

  const stylesheetLink = document.createElement('link');
  stylesheetLink.rel = 'stylesheet';
  stylesheetLink.href = href;
  stylesheetLink.dataset.dynamic = "true"; 
  stylesheetLink.onload = callback; 

  document.head.appendChild(stylesheetLink);
}

switch (page) {
  case "home":
    loadStylesheet("src/styles/index.css", renderHomePage);
    break;

  case "activities":
    loadStylesheet("src/styles/activitiesPage.css", () => {
      renderNav();
      renderActivitiesPage();
      startActivitiesLogic();
    });
    break;

  case "community":
    loadStylesheet("src/styles/community.css", () => {
      renderNav();
      renderCommunityPage();
      startCommunityLogic();
    });
    break;

  case "timer":
    loadStylesheet("src/styles/timer.css", () => {
      renderNav();
      renderTimerPage();
      startTimerLogic();
    });
    break;

  case "journal":
    loadStylesheet("src/styles/journal.css", () => {
      renderNav();
      renderJournalPage();
    });
    break;

  case "login":
    loadStylesheet("src/styles/login.css", renderLoginPage);
    break;

  case "register":
    loadStylesheet("src/styles/login.css", renderRegisterPage);
    break;

  case "profile":
    loadStylesheet("src/styles/profile.css", () => {
      renderNav();
      renderProfilePage();
      startProfileLogic();
    });
    break;

  default:
    loadStylesheet("src/styles/index.css", renderHomePage);
    break;
}

function preload_image(im_url) {
  let img = new Image();
  img.src = im_url;
}
