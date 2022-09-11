import { getElement } from "./utils.js";

const toggleBtn = getElement(".toggle-nav");
const sidebar = getElement(".sidebar-overlay");
const closeBtn = getElement(".sidebar-close");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("show");
});
