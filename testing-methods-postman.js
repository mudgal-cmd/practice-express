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

app.get('/api/findProductById', (req, res)=>{
  const {id} = req.query;

  const productsPromise = fetchProducts();

  productsPromise.then(data=>{
    const searchedProduct = data.filter(product=> 
      product.id === Number(id)
      );

      if(!searchedProduct || searchedProduct.length<1){
        return res.status(200).json({success:true, data:[]});
      }
    res.status(200).json(searchedProduct);
  });

});

app.get('/api/users', (req, res)=>{
  
  const userPromise = fetchUsers();

  const {query} = req.query;
  console.log(query);

  if(!query || Object.keys(query).length<1){
    return res.status(404).send('Please enter a parameter to search');
  }

  userPromise.then(data =>{
    
    if(isNaN(Number(query))){
      const searchedUser = data.filter(user=>user.username === query);
      // console.log(searchedUser);
      return res.status(200).json(searchedUser);
    }
    else{
      const searchedUser = data.filter(user => user.id === Number(query));
      console.log(searchedUser);
      return res.status(200).json(searchedUser);
    }

    });

  });

app.post('/api/users', (req, res)=>{

  const body = req.body;

  if(!body || Object.keys(body).length<1){
    return res.status(404)
    .json({
      success:false,
      msg: "No user provided."
    });
  }
  else{

    const userPromise = fetchUsers();

    userPromise.then(data=>{
      data.push(body);
      res.status(201).send({success:true, userData: data});
    });

  }

});


app.listen(5000, ()=>{
  console.log('Server is listening on port 5000...');
});