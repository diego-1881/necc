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
