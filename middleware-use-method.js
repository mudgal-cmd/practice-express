const express = require('express');

const app = express();

const logger = require('./logger-middleware-func');

const axios = require('axios');

app.use(logger); //app.use() -> ensures that the provided middleware will be applied to all the route methods.

async function fetchProducts(){
  const res = await axios.get('https://fakestoreapi.com/products');
  const data = res.data;
  return data // this will be a promise, because async-await always returns a promise

}

app.get('/',(req, res)=>{
  res.send('Home Page');
});
app.get('/about',(req, res)=>{
  res.send('About Page');
});
app.get('/api/products',(req, res)=>{
  // res.send('Home Page');
  const products = fetchProducts();
  products.then(data=>{
    res.send(data);
  }).catch(err=> console.log(err));

});
app.get('/api/products/items', (req, res)=>{
  const products = fetchProducts();
  products.then(data=>{
    // res.send(data[0]);
    const newArray = [];
    console.log(data.length);
    for(let i = 0; i < data.length; i++){
      const newObj = {id: data[i].id, title:data[i].title, price : data[i].price, rating:data[i].rating};
      // console.log(newObj);  
      newArray.push(newObj);
    }
    res.send(newArray);

  }).catch(err=>console.log(err));
});

app.listen(5000, ()=>{
  console.log('Server is listening on port 5000...');
});