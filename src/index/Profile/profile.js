export function renderProfilePage() {
  renderHTML();

  let shopItems = [];
  const fetchShopItems = async () => {
    try {
      const response = await fetch("src/index/Profile/profile_shop.json");
      shopItems = await response.json();
    } catch (error) {
      console.error("Error loading shop items:", error);
    }
  };

  // Generates shop based on JSJON file
  const generateShop = async (index) => {
    await fetchShopItems();

    let items = shopItems.categories[index].items;
    let ownedItems;

    // Initialize the user's owned items
    if (localStorage.getItem("ownedItems") === null) {
       ownedItems = ["Default", "No Accessory"];
    } else {
      ownedItems = JSON.parse(localStorage.ownedItems);
    }

    // Populate the shop with all the item cards
    let shop = items
      .map((item) => {
        let isOwned = false;

        // For every item in the shop, check if it's already owned, then update the card accordingly
        let foundItem = ownedItems.find(
          (i) => i.toLowerCase() === item.name.toLowerCase()
        );
let test = ownedItems.find((i) => {
  console.log(`Comparing: ${i.toLowerCase()} with ${item.name.toLowerCase()}`);
  return i.toLowerCase() === item.name.toLowerCase();
});
        if (foundItem !== undefined) {
          isOwned = true;
        }
        
        console.log(item, isOwned)

        // Update the card with its correct info + lock the card if it's not purchased yet
        return `
           <div class="card">
             <img src="${item.image}" alt="${item.altText}" />
             ${isOwned ? "Owned" : `${item.points} Points`}
             <img class="locked"
                  src="https://cdn.glitch.global/3774e2e9-58a5-41b3-9d45-62c8b63bc41c/locked.png?v=1732842808030"
                  alt="Locked"
                  style="display: ${isOwned ? "none" : "block"}"
                  data-item-name="${item.name.toLowerCase()}" />
           </div>
         `;
      })
      .join("");

    return shop;
  };

  // Spend the user's points based on the item
  const spendPoints = (item, points) => {
    let totalPoints = parseInt(localStorage.getItem("totalPoints") || "0");

    // Make sure user has enough points, otherwise alert them
    if (totalPoints >= points) {
      // Update points
      totalPoints -= points;
      localStorage.setItem("totalPoints", totalPoints);
      const pointsDisplay = document.getElementById("points");
      pointsDisplay.textContent = totalPoints;

      let ownedItems;
      if (localStorage.getItem("ownedItems") == null) {
        ownedItems = ["Default", "No Accessory"];
      } else {
        ownedItems = JSON.parse(localStorage.ownedItems);
      }
      // Add the newly purchased item to the owned items (local storage)
      ownedItems.push(item);
      // Store the array of purchased items as a string
      localStorage.setItem("ownedItems", JSON.stringify(ownedItems));

      // Find the locked image overlay and change it to the empty overlay
      let lockedImage = document.querySelector(
        `img.locked[data-item-name="${item.toLowerCase()}"]`
      );
      lockedImage.src =
        "https://cdn.glitch.global/3774e2e9-58a5-41b3-9d45-62c8b63bc41c/empty_overlay.png?v=1732774686767";

      alert(`You purchased ${item}!`);
    } else {
      alert("Not enough points!");
    }
  };

  // Update the avatar + accessory, then store it in the browser
  let currentProfilePic =
    localStorage.getItem("currentProfilePic") ||
    "https://cdn.glitch.global/3774e2e9-58a5-41b3-9d45-62c8b63bc41c/Original.png?v=1733376296306";
  const profilePic = document.querySelector(".profile-pic");
  profilePic.src = currentProfilePic;
  
  let currentAccessory =
    localStorage.getItem("currentAccessory") ||
    "https://cdn.glitch.global/3774e2e9-58a5-41b3-9d45-62c8b63bc41c/empty_overlay.png?v=1732774686767";
  const profileAccessory = document.querySelector(".accessory");
  profileAccessory.src = currentAccessory;

  // Render the color shop or the accessory shop based on the given index
  const renderShop = async (index) => {
    const shopHTML = await generateShop(index);
    let shop;
    switch (index) {
      case 0:
        shop = document.querySelector(".slider.colors");
        break;
      case 1:
        shop = document.querySelector(".slider.accessories");
        break;
    }

    // Populate the shop
    shop.innerHTML = shopHTML;

    // Add a click event to all the cards
    switch (index) {
      case 0:
        const profileColors = Array.from(
          document.querySelectorAll(".slider.colors .card img")
        ).filter((img) => !img.classList.contains("locked"));
        profileColors.forEach((color) => {
          color.addEventListener("click", () => {
            const foundColor = shopItems.categories[0].items.find(
              (c) => c.name.toLowerCase() === color.alt.toLowerCase()
            );

            const colorName = foundColor.name.toLowerCase();

            let ownedItems;

            if (localStorage.getItem("ownedItems") === null) {
              ownedItems = ["Default", "No Accessory"];
            } else {
              ownedItems = JSON.parse(localStorage.ownedItems);
            }

            let foundItem = null;

            foundItem = ownedItems.find((i) => i.toLowerCase() === colorName);

            // If the item isn't purchased yet, purchase it, otherwise just update the avatar
            if (foundItem == null) {
              spendPoints(color.alt, foundColor.points);
            }
            if (foundItem) {
              localStorage.setItem("currentProfilePic", color.src);
              profilePic.src = color.src;
            }
          });
        });
        break;
      case 1:
        const profileAccessories = document.querySelectorAll(
          ".slider.accessories .card img"
        );
        profileAccessories.forEach((accessory) => {
          accessory.addEventListener("click", () => {
            const foundAccessory = shopItems.categories[1].items.find(
              (a) => a.name.toLowerCase() === accessory.alt.toLowerCase()
            );
            const accessoryName = foundAccessory.name.toLowerCase();

            let ownedItems;

            if (localStorage.getItem("ownedItems") === null) {
              ownedItems = ["Default", "No Accessory"];
            } else {
              ownedItems = JSON.parse(localStorage.ownedItems);
            }

            let foundItem = null;

            foundItem = ownedItems.find(
              (i) => i.toLowerCase() === accessoryName
            );

            if (foundItem == null) {
              spendPoints(accessory.alt, foundAccessory.points);
            }
            if (foundItem) {
              localStorage.setItem("currentAccessory", accessory.src);
              profileAccessory.src = accessory.src;
            }
          });
        });
        break;
    }
  };

  // Render the color and accessory shops
  renderShop(0);
  renderShop(1);
}

// Updates the user's points from the community tab
export function startProfileLogic() {
  const pointsDisplay = document.getElementById("points");
  let totalPoints = parseInt(localStorage.getItem("totalPoints"), 10) || 0;
  pointsDisplay.textContent = totalPoints;
}

function getTotalTimeSpent() {
  let totalTimeSpent = parseInt(localStorage.getItem("totalTimeSpent")) || 0;

  const minutes = Math.floor(totalTimeSpent / 60);
  const remainingSeconds = totalTimeSpent % 60;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let timeString = "";

  if (hours > 0) {
    timeString += `${hours} hour${hours > 1 ? "s" : ""}, `;
  }
  if (remainingMinutes > 0 || hours > 0) {
    timeString += `${remainingMinutes} minute${
      remainingMinutes !== 1 ? "s" : ""
    }, `;
  }
  timeString += `${remainingSeconds} second${
    remainingSeconds !== 1 ? "s" : ""
  }`;

  return timeString;
}

function getTotalBreaks() {
  let totalBreaks = parseInt(localStorage.getItem("totalBreaks")) || 0;
  let breakString = `${totalBreaks} break${totalBreaks !== 1 ? "s" : ""}`;
  return breakString;
}

function getFavoriteBreaks() {
  let favoriteBreaks = JSON.parse(localStorage.getItem("favoriteBreaks"));
  if (favoriteBreaks && favoriteBreaks.length > 0) {
    favoriteBreaks.sort((a, b) => b.frequency - a.frequency);
    let top5 = favoriteBreaks.slice(0, 5);
    let breakCards = `
        ${top5.map(entry => `<div class="break-card">${entry.name}</div>`).join('')}
    `;
    return breakCards;
  } else {
    return `<div class="break-card">None</div>`;
  }
}

// Renders the base HTML
function renderHTML() {
  const main = document.querySelector("main");
  main.innerHTML = `
  <h1>My Profile</h1>

  <section class="profile">
  
    <div id="avatar" class="avatar-container">
      <img src="https://cdn.glitch.global/3774e2e9-58a5-41b3-9d45-62c8b63bc41c/Pink.png?v=1731989501902"
          class="profile-pic" alt="Avatar">
      <img src="https://cdn.glitch.global/3774e2e9-58a5-41b3-9d45-62c8b63bc41c/empty_overlay.png?v=1732774686767"
          class="accessory" alt="Accessory">
    </div>

    <div class="profile-details">
      <h3>Username</h3>
      <p>PinkFrog</p>
      <h3>Total Time Studied</h3>
      <p>${getTotalTimeSpent()}</p>
      <h3>Total Breaks Taken</h3>
      <p>${getTotalBreaks()}</p>
    </div>
  </section>

  <section class="card-slider">
    <h2>Top 5 Favorite Breaks</h2>
    <div class="slider-container">
      <div class="slider breaks"> 
        ${getFavoriteBreaks()}
      </div>
    </div>
  </section>

  <section class="my-points">
    <h2>My Points</h2>
    <div class="points-box">
      <p><span id="points">20</span> points</p>
      <button
        class="more-points-btn"
        onclick="window.location.href='?page=community'"
      >
        Earn More Points
      </button>
    </div>
  </section>

  <section class="card-slider">
    <h2>Redeem Your Points</h2>
    <div class="slider-container colors">
      <h3>Colors</h3>
        <div class="slider colors">
        </div>
    <div class="slider-container">
      <h3>Accessories</h3>
        <div class="slider accessories">
        </div>
      </div>
    </div>
  </section>
  `;
}
