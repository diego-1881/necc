import Swiper from "swiper/bundle";

// Swiper 11.2.1
function swiperSlider() {
  const bulletTexts = Array.from(document.querySelectorAll(".bullet-title")).map((span) => span.getAttribute("data-text"));

  const swiper = new Swiper(".swiper", {
    autoHeight: true,
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
}

function init() {
  document.addEventListener("DOMContentLoaded", async () => {
    swiperSlider();
  });
}
init();
