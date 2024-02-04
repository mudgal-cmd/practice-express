const express = require('express');

const data = require('./constant');

// const session = require('express-session');

const cookieParser = require('cookie-parser');

const app = express();

const axios = require('axios');

app.use(express.json());

app.use(cookieParser());

async function fetchCart(){
    
  const response = await axios.get('https://fakestoreapi.com/carts');

  const cartData = response.data;

  return cartData;

}

app.get('/api/login', (req, res)=>{
  res.cookie('loginCookie', 'authorized', {expires: new Date(Date.now()+90000)});
  res.status(200).send('Authorized');
});

app.get('/api/getCart', (req, res)=>{
  console.log(req.cookies);
  if(req.cookies && req.cookies.loginCookie === 'authorized'){

    const cartPromise = fetchCart();

    cartPromise.then(cart=> {
      return res.status(200).send(cart);
    }).catch(err=> console.log(err));

    // res.status(200)
  }

  else{
    return res.status(401).send('You are not authorized to access the content');
  }

  

});

app.listen(5000, ()=>{
  console.log('Server is listening on port 5000...');
});

