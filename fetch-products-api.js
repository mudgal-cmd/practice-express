const express = require('express');
const {products} = require('./data');

const app = express();

console.log(products);

// app.get('/', (req, res)=>{
//   res.status(200).json(products);
// });

app.get('/', (req, res)=>{
  res.send('<h1>Explore Products</h1> <a href="/api/products">Products</a>');
});

app.get('/api/products', (req, res)=>{
  const newProducts = products.map((product) =>{
    const {id, name, image, price} = product;

    return {id, name, image, price};
  });
  res.send(newProducts);
});

app.get('/api/products/1', (req, res)=>{
  // res.send(products.filter((product)=>product.id===1));
  const product = products.find((product)=> product.id === 1);
  res.json(product);
});

app.listen(5000, ()=>{
  console.log('Server is listening at port 5000...');
});