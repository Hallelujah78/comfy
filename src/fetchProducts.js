import { allProductsUrl } from "./utils.js";

const fetchProducts = async () => {
  try {
    //loading here?
    //fetch and convert to json
    const response = await fetch(allProductsUrl);
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
};

export default fetchProducts;
