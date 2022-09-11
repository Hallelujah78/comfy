// global imports
import "../toggleSidebar.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";
// specific
import { addToCart } from "../cart/setupCart.js";
import { singleProductUrl, getElement, formatPrice } from "../utils.js";

// selections
const loading = getElement(".page-loading");

const centerDOM = getElement(".single-product-center");
const pageTitleDOM = getElement(".page-hero-title");
const imgDOM = getElement(".single-product-img");
const titleDOM = getElement(".single-product-title");
const companyDOM = getElement(".single-product-company");
const priceDOM = getElement(".single-product-price");
const colorsDOM = getElement(".single-product-colors");
const descDOM = getElement(".single-product-description");
const cartBtn = getElement(".addToCartBtn");

// cart product
let productID;

// show product when page loads
window.addEventListener("DOMContentLoaded", async () => {
  const id = window.location.search;
  try {
    const response = await fetch(`${singleProductUrl}${id}`);
    //catch wrong status error (not network)
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json();
      //grab data from product:
      const {
        id,
        fields: { name, company, price, colors, description },
      } = product;
      const image = product.fields.image[0].thumbnails.large.url;

      productID = id;
      //set values
      document.title = `${name.toUpperCase()} | Comfy`;
      pageTitleDOM.textContent = `home / ${name}`;
      imgDOM.src = image;
      titleDOM.textContent = name;
      companyDOM.textContent = `by ${company}`;
      priceDOM.textContent = `${formatPrice(price)}`;
      //colors

      colorsDOM.innerHTML = colors
        .map((color) => {
          return `<span class="product-color" style="background-color: ${color}"></span>`;
        })
        .join("");
      //description
      descDOM.textContent = description;
      //cart
      cartBtn.dataset.id = id;

      //end of set values
    } else {
      console.log(response.status, response.statusText);
      centerDOM.innerHTML = `<div><h3 class="error">sorry, something went wrong</h3><a class="btn" href="index.html">back home</a></div>`;
    }
  } catch (error) {
    //catch network error
    console.log(error);
  }

  loading.style.display = "none";
});

cartBtn.addEventListener("click", function () {
  addToCart(productID);
});
