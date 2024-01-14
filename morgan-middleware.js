const express = require('express');

const app = express();

const morgan = require('morgan');

const axios = require('axios');

async function fetchProducts(){
  const response = await axios.get('https://fakestoreapi.com/products/');
  const data = response.data;
  return data;
}

app.use(morgan('tiny'));

app.get('/', (req, res)=>{
  res.send('<h1>HOME PAGE</h1>');
});

app.get('/about', (req, res)=>{
  res.send('<h1>ABOUT</h1>');
});

app.get('/api/products', (req, res)=>{
  
  const productsPromise = fetchProducts();

  productsPromise.then(products=>{
    res.json(products);
  });

});

app.get('/api/products/items', (req, res)=>{
  
  const productsPromise = fetchProducts();

  productsPromise.then(products=>{
    let customizedtem = {};
    const items = [];

    for(let i=0; i<products.length; i++){
      customizedtem = {id: products[i].id, title: products[i].title};
      items.push(customizedtem);
    }
    res.send(items);
  })

});

app.listen(5000, ()=>{
  console.log('Server is listening on port 5000...');
});