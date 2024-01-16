const express = require('express');

const axios = require('axios');

const app = express();

app.use(express.json());

async function fetchProducts(){
  const response = await axios.get('https://fakestoreapi.com/products');
  const productData = response.data;
  return productData; 
}

async function fetchUsers(){
  const response = await axios.get('https://fakestoreapi.com/users');
  const userData = response.data;
  return userData;
}

app.get('/', (req, res)=>{
  res.send('Home Page');
});

app.get('/api/products', (req, res)=>{
  const productPromise = fetchProducts();

  productPromise.then(data=>{
    return res.send(data);
  }).catch(err=>{return res.send(err)});

});

app.get('/api/users', (req, res)=>{
  
  const userPromise = fetchUsers();

  userPromise.then(data =>{
    res.send(data);
  });

});

app.post('/api/users', (req, res)=>{

  const body = req.body;

  const userPromise = fetchUsers();

  userPromise.then(data=>{
    data.push(body);
    res.status(201).send({success:true, userData: data});
  })

});


app.listen(5000, ()=>{
  console.log('Server is listening on port 5000...');
});