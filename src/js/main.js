import "../scss/styles.scss";
import * as bootstrap from "bootstrap";

document.addEventListener("DOMContentLoaded", async () => {
  async function loadHTML(elementId, url) {
    const container = document.getElementById(elementId);
    const response = await fetch(url);
    const html = await response.text();
    container.innerHTML = html;
  }

  await loadHTML("footer", "footer.html");
  await loadHTML("topNav", "nav.html");
});

// Our leadership team
// Disable the cards that are not selected
function disableUnselectedCards() {
  const cards = document.querySelectorAll(".team-accordion.card-team");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const isSelected = card.classList.contains("selected");

      cards.forEach((c) => {
        c.classList.remove("selected", "opacity-50", "pe-none");
      });

      if (!isSelected) {
        card.classList.add("selected");
        cards.forEach((c) => {
          if (!c.classList.contains("selected")) {
            c.classList.add("opacity-50", "pe-none");
          }
        });
      }
    });
  });
}

function init() {
  document.addEventListener("DOMContentLoaded", async () => {
    disableUnselectedCards();
  });
}
init();
