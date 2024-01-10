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

app.get('/api/products/:productID', (req, res)=>{
  // res.send(products.filter((product)=>product.id===1));
  console.log(req.params);
  const {productID: singleProductParam} = req.params; // Using object destructuring renamed the productID property to 'singleProductParam'.
  // an easy alternative would be to do it without renaming :- 'const{productID} = req.params';

  

  const product = products.find((product)=> product.id === Number(singleProductParam));

  if(!product){
    res.status(404).send('Error: Could not find the product');
  }
  res.json(product);
});

app.get('/api/products/:productID/reviews/:reviewId', (req, res)=>{
  const productId = req.params.productID;
  const reviewId = req.params.reviewId;
  const singleProduct = products.find((product)=> product.id === Number(productId)); 
  console.log(productId, reviewId);
  console.log(singleProduct);
  res.send(`The product with id: ${productId} having reviews ${reviewId} has been found\n ${JSON.stringify(singleProduct)}`);

});

app.listen(5000, ()=>{
  console.log('Server is listening at port 5000...');
});