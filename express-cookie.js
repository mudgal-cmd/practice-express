const express = require('express');

const data = require('./constant');

const session = require('express-session');

const app = express();

const axios = require('axios');

app.use(express.json());

async function fetchCart(){
    
  const response = await axios.get('https://fakestoreapi.com/carts');

  const cartData = response.data;

  return cartData;

}