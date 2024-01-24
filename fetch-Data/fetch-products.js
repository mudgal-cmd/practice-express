const axios = require('axios');

const {products} = require('../data');

console.log(products);

// async function getProducts(){

//   const response = await axios.get('https://fakestoreapi.com/products');

//   // console.log(response.data);

//   const productsData = response.data;

//   return productsData;

// }

const getProducts = () =>{
  return products;
}

// getProducts();

module.exports = getProducts;