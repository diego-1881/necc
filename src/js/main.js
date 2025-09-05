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
function handleSearchIconClick(searchIcons) {
  searchIcons.forEach((searchIcon) => {
    const searchContainer = searchIcon.closest(".search-container");
    const searchInput = searchContainer.querySelector(".form-control-search");

    searchIcon.addEventListener("click", function (e) {
      const mainNavbar = searchIcon.closest(".navbar-collapse");
      mainNavbar?.classList.add("d-none");

      handleSearchExpand(searchContainer, searchInput);
    });
  });
}

function handleSearchCloseClick(searchClose) {
  searchClose.forEach((closeButton) => {
    const searchContainer = closeButton.closest(".search-container");
    const searchInput = searchContainer.querySelector(".form-control-search");

    closeButton.addEventListener("click", function (e) {
      const mainNavbar = closeButton.closest(".navbar-collapse");
      mainNavbar?.classList.remove("d-none");

      handleSearchContract(searchContainer, searchInput, mainNavbar);
    });
  });
}

function handleSearchExpand(searchContainer, searchInput, mainNavbar) {
  searchContainer.classList.add("search-container-expanded");
  searchInput.classList.add("form-control-search-expanded");
  searchInput.focus();
}

function handleSearchContract(searchContainer, searchInput, mainNavbar) {
  mainNavbar?.classList.remove("d-none");
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

// Close navbar on click outside
function closeNavbarOnClickOutside() {
  const navbarCollapse = document.getElementById("mainNavbar");
  const navbarToggler = document.querySelector(".navbar-toggler");

  document.addEventListener("click", function (event) {
    const isNavbarOpen = navbarCollapse.classList.contains("show");
    if (!isNavbarOpen) return;

    if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
      const bsCollapse = Collapse.getOrCreateInstance(navbarCollapse);
      bsCollapse.hide();
    }
  });
}

// Animation
function initializeAnimations() {
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
    const searchIcons = document.querySelectorAll(".search-icon");
    const searchClose = document.querySelectorAll(".search-close");
    const notificationBar = document.getElementById("notificationBar");
    const closeNotificationBarBtn = document.getElementById("closeNotificationBarBtn");

    if (isMobile()) {
      reorderTeamCards();
    }

    handleSearchIconClick(searchIcons);
    handleSearchCloseClick(searchClose);
    disableUnselectedCards();
    filterNewsByCategory();
    await loadHTMLParts("footer", "footer.html");
    await loadHTMLParts("topNav", "nav.html");
    notificationBar && closeNotificationBar(notificationBar, closeNotificationBarBtn);
    closeNavbarOnClickOutside();
    initializeAnimations();
    handleNavbarDropdowns();
  });
}
init();
