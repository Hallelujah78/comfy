import { getStorageItem, setStorageItem } from "./utils.js";
let store = getStorageItem("store");

const setupStore = (products) => {
  //map over the products
  store = products.map((product) => {
    //destructure the product attributes you are interested in
    const {
      id,
      fields: { featured, name, price, company, colors, image: img },
    } = product;
    //image has an alias of img, set what image refers to
    const image = img[0].thumbnails.large.url;

    // return a simplified object where the attributes are easily accessed
    return {
      id,
      featured,
      name,
      price,
      company,
      colors,
      image,
    };
  });
  setStorageItem("store", store);
};

const findProduct = (id) => {
  let product = store.find((item) => {
    return item.id === id;
  });

  return product;
};

export { store, setupStore, findProduct };
