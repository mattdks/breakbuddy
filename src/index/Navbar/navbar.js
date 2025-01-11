export default function renderNav() {
  
  const nav = document.querySelector("nav");
  nav.innerHTML = `
        <div class="logo"><a href="index.html"><img src="https://cdn.glitch.global/3774e2e9-58a5-41b3-9d45-62c8b63bc41c/breakBuddy%20(1).png?v=1732571661167" style="width: 150px; height: auto;"></a></div>
        <ul class="nav-links">
          <li><a href="?page=home">Home</a></li>
          <li><a href="?page=activities">Activities</a></li>
          <li><a href="?page=timer">Timer</a></li>
          <li><a href="?page=journal">Journal</a></li>
          <li><a href="?page=community">Community</a></li>
          <li><a href="?page=profile">My Profile</a></li>
        </ul>
        <div class="menu-icon">
          <i class="fa-solid fa-bars" onclick="toggleMenu()"></i>
        </div>`;
  const menuList = document.querySelector(".nav-links");
  menuList.style.maxHeight = "0px";
  menuList.style.zIndex= 1000;

  window.toggleMenu = function () {
    if (menuList.style.maxHeight === "0px") {
      menuList.style.maxHeight = "355px";
    } else {
      menuList.style.maxHeight = "0px";
    }
  };
}