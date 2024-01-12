const express = require('express');

const app = express();

const logger = require('./logger-middleware-func');

const axios = require('axios');

// axios.get('https://fakestoreapi.com/products')
// .then((response)=>{
//   products = response.data;
// });

async function getProducts(){
  const res = await axios.get('https://fakestoreapi.com/products');
  const data = res.data;
  const products = [];
  products.push(data);
  return products;
  // return products;
  // console.log(products);
}

// const products = getProducts();

// products.then(data=>console.log(data));

app.get('/',(req, res)=>{
  res.send('Home Page');
});
app.get('/about',(req, res)=>{
  res.send('About Page');
});
app.get('/api/products',(req, res)=>{
  // res.send('Home Page');
  const products = getProducts();

  products.then(data=>{
    res.send(data);
  });

});
// app.get('/api/items',(req, res)=>{
//   res.send('Home Page');
// });
// console.log(products);
// console.log(products);

app.listen(5000, ()=>{
  console.log('Server is listening on port 5000...');
});