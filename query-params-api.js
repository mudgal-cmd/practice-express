const express = require('express');
const {products} = require('./data');

const app = express();

app.get('/', (req, res)=>{
  res.send('<h1>Welcome to the Products API </h1><a href="/api/products">Explore products</a>');
});

app.get('/api/products', (req, res)=>{
  res.json(products);
});

app.get('/api/products/v1/query', (req, res)=>{

  const {search, limit} = req.query;
  let searchedProducts = products;
  if(search){
    searchedProducts = searchedProducts.filter((product)=>{
      return product.name.startsWith(search);
    })
  } 

  if(limit){
    searchedProducts = searchedProducts.slice(0,Number(limit));
  }

  //The reason that the condition - searchedProducts === null won't work in if condition. Reason being that in JS even an empty array is considered as truthy and won't be falsy/condition won't work in if and the following code would not be executed.
  if(searchedProducts.length<1){
    console.log('Array is null');
    // res.status(200).send(products);

    return res.status(200).json({success:true, data:[]}); //This is the suggested way to handle null responses.
    //Need to explicitely return (since there can be only 1 request per route handler, that's why we return to exit the callback function as soon as the condition is fulfilled) otherwise we get an error - "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"

  }

  res.status(200).json(searchedProducts);

});

app.listen(5000, ()=>{
  console.log('Server is listening at port 5000...');
});