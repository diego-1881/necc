import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import Swiper from "swiper/bundle";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const bulletTexts = Array.from(document.querySelectorAll(".bullet-title")).map((span) => span.getAttribute("data-text"));

const swiper = new Swiper(".swiper", {
  modules: [Navigation, Pagination],
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + bulletTexts[index] + "</span>";
    },
  },
});

document.addEventListener("DOMContentLoaded", async () => {
  async function loadHTML(elementId, url) {
    const container = document.getElementById(elementId);
    const response = await fetch(url);
    const html = await response.text();
    container.innerHTML = html;
  }

  await loadHTML("footer", "footer.html");
  await loadHTML("topNav", "nav.html");

  const navbarDropdowns = document.querySelectorAll("#mainNavbar .dropend > .dropdown-item");
  navbarDropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  });
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

function init() {
  document.addEventListener("DOMContentLoaded", async () => {
    const searchIcon = document.querySelector(".search-icon");
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.querySelector(".form-control-search");
    const searchClose = document.querySelector(".search-close");

    if (searchIcon) {
      handleSearchIconClick(searchIcon, searchContainer, searchInput);
      handleSearchCloseClick(searchClose, searchContainer, searchInput);
    }
    disableUnselectedCards();
    filterNewsByCategory(searchIcon, searchContainer, searchInput);
  });
}
init();

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
