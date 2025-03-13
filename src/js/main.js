import "../scss/styles.scss";
import * as bootstrap from "bootstrap";

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

// News
// Filter
function filterNewsByCategory() {
  const filters = document.querySelectorAll(".news-filters [data-filter]");
  const articles = document.querySelectorAll(".news");

  filters.forEach((filter) => {
    filter.addEventListener("click", function (event) {
      event.preventDefault();
      const category = filter.getAttribute("data-filter");

      filters.forEach((f) => f.classList.remove("active"));
      filter.classList.add("active");

      articles.forEach((article) => {
        if (category === "all" || article.getAttribute("data-category") === category) {
          article.classList.remove("fade", "show");
          void article.offsetWidth;
          article.classList.add("fade", "show");
          article.style.display = "block";
        } else {
          article.classList.remove("fade", "show");
          void article.offsetWidth;
          article.classList.add("fade");

          setTimeout(() => {
            article.style.display = "none";
          }, 200);
        }
      });
    });
  });
}

// Navbar
function handleScroll() {
  const topNav = document.getElementById("topNav");

  if (window.scrollY > 80) {
    topNav.classList.add("navbar-scrolled");
  } else {
    topNav.classList.remove("navbar-scrolled");
  }
}

window.addEventListener("scroll", handleScroll);
handleScroll();

// Search component
function handleSearchIconClick(searchIcon, searchContainer, searchInput) {
  searchIcon.addEventListener("click", function () {
    handleSearchExpand(searchContainer, searchInput);
  });
}

function handleSearchCloseClick(searchClose, searchContainer, searchInput) {
  searchClose.addEventListener("click", function () {
    handleSearchContract(searchContainer, searchInput);
  });
}

function handleSearchExpand(searchContainer, searchInput) {
  searchContainer.classList.add("search-container-expanded");
  searchInput.classList.add("form-control-search-expanded");
  searchInput.focus();
}

function handleSearchContract(searchContainer, searchInput) {
  searchContainer.classList.remove("search-container-expanded");
  searchInput.classList.remove("form-control-search-expanded");
}

// Load HTML parts for mockup
async function loadHTMLParts(elementId, url) {
  const container = document.getElementById(elementId);
  const response = await fetch(url);
  const html = await response.text();
  container.innerHTML = html;
}

// Navbar dropend click
function handleNavbarDropdowns() {
  const navbarDropdowns = document.querySelectorAll("#mainNavbar .dropend > .dropdown-item");

  navbarDropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  });
}

// Notification bar
function closeNotificationBar(notificationBar, closeNotificationBarBtn) {
  closeNotificationBarBtn.addEventListener("click", function () {
    notificationBar.remove();
  });
}

function init() {
  document.addEventListener("DOMContentLoaded", async () => {
    const searchIcon = document.querySelector(".search-icon");
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.querySelector(".form-control-search");
    const searchClose = document.querySelector(".search-close");
    const notificationBar = document.getElementById("notificationBar");
    const closeNotificationBarBtn = document.getElementById("closeNotificationBarBtn");

    if (searchIcon) {
      handleSearchIconClick(searchIcon, searchContainer, searchInput);
      handleSearchCloseClick(searchClose, searchContainer, searchInput);
    }
    disableUnselectedCards();
    filterNewsByCategory(searchIcon, searchContainer, searchInput);

    await loadHTMLParts("footer", "footer.html");
    await loadHTMLParts("topNav", "nav.html");
    handleNavbarDropdowns();
    notificationBar && closeNotificationBar(notificationBar, closeNotificationBarBtn);
  });
}
init();
