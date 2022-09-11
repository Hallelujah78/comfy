import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupCompanies = (store) => {
  const companies = ["all", ...new Set(store.map(({ company }) => company))];

  const companiesDOM = getElement(".companies");
  companiesDOM.innerHTML = companies
    .map((companyName) => {
      return `<button class="company-btn">${companyName}</button>`;
    })
    .join("");
  companiesDOM.addEventListener("click", function (e) {
    const element = e.target;
    const elementText = element.textContent;
    if (element.classList.contains("company-btn")) {
      let newStore = [];
      if (elementText === "all") {
        newStore = [...store];
      } else {
        newStore = store.filter(({ company }) => {
          return elementText === company;
        });
      }
      display(newStore, getElement(".products-container"), true);
    }
  });
};

export default setupCompanies;
