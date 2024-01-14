const express = require('express');

const app = express();

// console.log(app);

const axios = require('axios');

const authorize = require('./authorize');

const logger = require('./logger-middleware-func');

async function fetchproducts() {
  const response = await axios.get('https://fakestoreapi.com/products/');
  const data = response.data;
  return data;
}

app.use([authorize, logger]);

app.get('/', (req, res) => {
  res.send('<h2>Home</h2>');
});

app.get('/about', (req, res) => {
  res.send('<h2>About</h2>');
});

app.get('/api/products', (req, res) => {

  const showProducts = fetchproducts();

  showProducts.then(data => {
    res.send(data);
  });

});
// It is possible that we do not want every middleware to be attached to every route method, so to selectively attach a middleware to a route method, plug-in the middleware between the 'path' and the route handler(req, res) method - 
//'app.get('/', [logger, authorize], (req, res)=>{});

app.get('/api/products/items', (req, res)=>{
  const products = fetchproducts();
  let selectedProductAttributes = {};
  let itemsArray=[];
  products.then(data=>{
    for(let i =0; i<data.length; i++){
      // console.log(data[i].title);

      selectedProductAttributes = {id: data[i].id, title: data[i].title, price: data[i].price, rating:data[i].rating};
      itemsArray.push(selectedProductAttributes);

    }
    res.status(200).send(itemsArray);
  });

});

app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});

