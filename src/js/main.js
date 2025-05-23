import "../scss/styles.scss";
import Dropdown from "bootstrap/js/dist/dropdown";
import Collapse from "bootstrap/js/dist/Collapse";
import { main } from "@popperjs/core";

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

// Animation
function initializeAnimationsIfAllowed() {
  const isAnimationOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  if (isAnimationOk) {
    animateVisibility();
    animatePageTitle();
    animateInstagramFeed();
    adjustFooterSpacer();
    animateFooterReveal();

    window.addEventListener("scroll", animateVisibility);
    window.addEventListener("resize", animateVisibility);
    window.addEventListener("scroll", animateInstagramFeed);
    window.addEventListener("scroll", adjustFooterSpacer);
  }
}

function animateVisibility() {
  const elements = document.querySelectorAll(
    "section h2, section h3, section h4, section h5, section h6, section p:not(:has(img)), section ul, .icons-list img, .icons-list ul, .footer-container, .animation-mask, .necc-programs-item, .necc-programs-graph-title"
  );

  elements.forEach((elem) => {
    const rect = elem.getBoundingClientRect();
    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (isVisible) {
      elem.classList.add("is-visible");
    }
  });
}

function animatePageTitle() {
  const pageTitle = document.querySelector(".hero h1");
  pageTitle?.classList.add("is-visible");
}

function animateInstagramFeed() {
  const instagramFeedItems = document.querySelectorAll("#instagramFeed div[data-speed]");
  const scrollY = window.scrollY;

  if (!instagramFeedItems.length) return;

  instagramFeedItems.forEach((el) => {
    const speed = parseFloat(el.getAttribute("data-speed"));
    const translateY = (1 - speed) * scrollY;
    el.style.transform = `translateY(${translateY}px)`;
  });
}

function adjustFooterSpacer() {
  const footer = document.querySelector(".footer-container");
  const footerSpacer = document.querySelector(".footer-spacer");

  if (!footer || !footerSpacer) return;

  const footerHeight = footer.offsetHeight;

  footerSpacer.style.height = `${footerHeight * 2}px`;
  footerSpacer.style.marginTop = `-${footerHeight}px`;
  footer.style.top = `calc(100vh - ${footerHeight}px)`;
}

function animateFooterReveal() {
  let footer = document.querySelector(".footer-container");
  const rect = footer.getBoundingClientRect();
  const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

  if (isVisible) {
    footer.classList.add("is-visible");
  }
}

function reorderTeamCards() {
  const teamCards = document.querySelectorAll(".team-accordion .container .col");

  teamCards.forEach((card) => {
    const mainContainer = card.closest(".team-accordion")?.querySelector(".team-accordion-container .row");
    mainContainer?.appendChild(card);
  });
}

function isMobile() {
  return window.innerWidth <= 768;
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
    if (isMobile()) {
      reorderTeamCards();
    }
    disableUnselectedCards();
    filterNewsByCategory(searchIcon, searchContainer, searchInput);

    await loadHTMLParts("footer", "footer.html");
    await loadHTMLParts("topNav", "nav.html");
    handleNavbarDropdowns();
    initializeAnimationsIfAllowed();
    notificationBar && closeNotificationBar(notificationBar, closeNotificationBarBtn);
  });
}
init();
