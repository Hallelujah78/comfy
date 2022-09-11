import { formatPrice, getElement } from "../utils.js";
const cartItemsDOM = document.querySelector(".cart-items");
const addToCartDOM = ({ amount, id, price, name, image }) => {
  const article = document.createElement("article");
  article.classList.add("cart-item");
  article.setAttribute("data-id", id);

  article.innerHTML = `<img class="cart-item-img" src="${image}" alt="${name}">
          <!-- item info -->
          <div>
            <h4 class="cart-item-name">
              ${name}
            </h4>
            <p class="cart-item-price">${formatPrice(price)}</p>
            <button class="cart-item-remove-btn" data-id="${id}">remove</button>
          </div>
          <!-- amount toggle -->
          <div>
            <button class="cart-item-increase-btn" data-id="${id}">
              <i class="fas fa-chevron-up"></i>
            </button>
            <p class="cart-item-amount" data-id="${id}">${amount}</p>
            <button data-id="${id}"class="cart-item-decrease-btn">
              <i class="fas fa-chevron-down"></i>
            </button>
          </div>`;

  cartItemsDOM.appendChild(article);
};

export default addToCartDOM;
