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

//To selectively use a middleware, just provide the endpoint before the middleware is invoked, eg: '/api/auth/status', here before session().
app.use(session({
  secret: 'session-secret-key',
  saveUninitialized: false,
  resave: false,
  cookie:{
    maxAge: 90000
  }
}));

app.get('/api/login', (req, res)=>{
  
  res.status(200).send(data);

});

app.post('/api/auth', (req, res)=>{

  const {username, password} = req.body;

  const findUser = data.find(user => user.username === username);

  if(findUser && findUser.password === password){
    req.session.user = findUser;
    return res.status(200).send('Authentication successfull');
  }
  return res.status(401).send('Authentication Failed!! Please provide valid credentials');

});

app.get('/api/auth/status', (req, res)=>{

  console.log(req.session);

  return req.session.user? res.status(200).send(req.session.user) : res.send("Not authenticated");

});

app.post('/api/cart/addToCart', (req, res)=>{
  // 
  const cartData = fetchCart();

  const {body} = req;

  cartData.then(cart => {
    
    // console.log(cart);

    // console.log(body);
    if(req.session.user){
      
    }

    cart.push(body);

    res.status(200).json({success:true, data: cart});

  }).catch(err=> console.log(err));

});

app.listen(5000, ()=>{
  console.log('Server is listening on port 5000...');
});
