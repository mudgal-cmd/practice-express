const express = require('express');

const router = express.Router();

const products = require('../fetch-Data/fetch-products');

// console.log(products());

const people = require('../fetch-Data/fetch-users');

// const app = express();

// app.use(express.json()); //express.json() middleware is needed in app.js not here.

router.get('/', (req, res)=>{
  res.status(200).json({success:true, data:products()});
});

router.post('/addUser', (req, res)=>{
  
  const body = req.body;

  console.log(req.body);
  people().push(body);

  res.status(200).json(people());

});
console.log(people());
module.exports = router;