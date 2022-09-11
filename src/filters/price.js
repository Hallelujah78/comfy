import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupPrice = (store) => {
  const priceInput = getElement(".price-filter");
  const priceValue = getElement(".price-value");
  // set up max, min, value

  //max price set up
  let maxPrice = store.map(({ price }) => {
    return price;
  });
  maxPrice = Math.ceil(Math.max(...maxPrice) / 100);
  //min price set up
  let minPrice = store.map(({ price }) => {
    return price;
  });
  minPrice = Math.floor(Math.min(...minPrice) / 100);

  priceInput.value = maxPrice;
  priceInput.max = maxPrice;
  priceInput.min = 0;
  priceValue.textContent = `Value : $${maxPrice}`;
  priceInput.addEventListener("input", function () {
    const value = parseInt(priceInput.value);

    priceValue.textContent = `Value : $${value}`;
    let newStore = store.filter(({ price }) => {
      return price / 100 <= value;
    });
    display(newStore, getElement(".products-container"), true);
    if (newStore.length < 1) {
      const productsContainer = getElement(".products-container");
      productsContainer.innerHTML = `<h3 class="filter-error">sorry, no products matched your search</h3>`;
    }
  });
};

export default setupPrice;
