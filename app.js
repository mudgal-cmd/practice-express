const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors());

app.use(express.json());

const {products, people} = require('./data');

// console.log(people);

app.get('/', (req, res)=>{
  res.send('HomePage');
});

app.post('/api/people', (req, res)=>{
  const{name} = req.body;

  if(!name){
    return res.status(404).json({success: false, person: 'Cannot add the person'});
  }
  
  console.log('Post request',name);
  res.status(201).json({success: 'hogya', person: name});
});

app.get('/api/people', (req, res)=>{
  res.status(200).json({success: 'true', data:people});
});

app.listen(5000, ()=>{
  console.log('Server is listening at port 5000...');
});