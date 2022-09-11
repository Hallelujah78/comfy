// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";
// set items
//select cart item count in the navbar
const cartItemCountDOM = getElement(".cart-item-count");
//select cart items container
const cartItemsDOM = getElement(".cart-items");
//cart total
const cartTotalDOM = getElement(".cart-total");
//cart check out button
const cartCheckoutBtn = getElement(".cart-checkout");

let cart = getStorageItem("cart");

export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === id);

  if (!item) {
    //item not in cart, get from store
    let product = findProduct(id);
    //add item to cart
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    //add item to the DOM
    addToCartDOM(product);
  } else {
    const amount = increaseAmount(id); //returns newAmount
    const items = [...cartItemsDOM.querySelectorAll(".cart-item-amount")];
    const newAmount = items.find((value) => {
      return value.dataset.id === id;
    });
    newAmount.textContent = amount;
  }

  //add one to item count
  displayCartItemCount();
  //display cart totals
  displayCartTotal();
  //set cart in local storage
  setStorageItem("cart", cart);

  //more stuff coming up
  openCart();
};

//this updates the total item count that appears in the nav on every page!!!
const displayCartItemCount = () => {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
};
const displayCartTotal = () => {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount * cartItem.price);
  }, 0);
  cartTotalDOM.textContent = `Total : ${formatPrice(total)}`;
};

const setupCartFunctionality = () => {
  cartItemsDOM.addEventListener("click", function (e) {
    const element = e.target;
    const parent = e.target.parentElement;
    const elementID = element.dataset.id;
    const parentID = parent.dataset.id;
    if (element.classList.contains("cart-item-remove-btn")) {
      removeItem(elementID);
      parent.parentElement.remove();
    }
    if (parent.classList.contains("cart-item-increase-btn")) {
      const amount = increaseAmount(parentID);
      parent.parentElement.querySelector(".cart-item-amount").textContent =
        amount;
    }
    if (parent.classList.contains("cart-item-decrease-btn")) {
      const amount = decreaseAmount(parentID);
      console.log(typeof amount);
      if (amount === 0) {
        removeItem(parentID);
        parent.parentElement.parentElement.remove();
      } else {
        parent.parentElement.querySelector(".cart-item-amount").textContent =
          amount;
      }
    }
    displayCartItemCount();
    displayCartTotal();
    setStorageItem("cart", cart);
  });
};

const removeItem = (id) => {
  cart = cart.filter((cartItem) => {
    return cartItem.id !== id;
  });
};

const displayCartItemsDOM = () => {
  cart.forEach((product) => {
    addToCartDOM(product);
  });
};

function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;

  //update DOM
}

function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;

  //update DOM
}

const init = () => {
  //display amount of cart items
  displayCartItemCount();
  //display total value of cart items
  displayCartTotal();
  // add all cart items to the DOM
  displayCartItemsDOM();
  //setup cart functionality - buttons
  setupCartFunctionality();
};
init();
