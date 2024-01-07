
//1st way to use express in the code.

const express = require('express');

const app = express();

//2nd way to use express in your code is as follows:
// const app = require('express')();

app.get('/', (req, res)=>{
  res.status(200).send('<h2>Home Page</h2>');
});

app.get('/about', (req,res)=>{
  res.status(200).send('<h2>This is about</h2>');
});

app.all('*', (req, res)=>{
  res.status(404).send('<h3>Error: We could not locate the resource you asked for.</h3>');
});
//The .all() method is used similar to 'else' in http module, where we want to handle all the scenarios except the homepage and about by showing resource not found 404. All is applied to every http method in a request - post, get, put, delete. '*' here means all the combinations of the request resource as a string.

app.listen(5000, ()=>{
  console.log('Server is listening....');
});