const express = require('express');

const app = express();

app.use(express.static('./methods-public', {index: 'test-post-method.html'}));

app.use(express.urlencoded({extended: false}));

app.post('/login', (req, res)=>{

  console.log(req.body);

  const {name} = req.body;

  if(name){
    return res.send(`Welcome ${name}`);
  }

  res.send('Please provide the credentials');

});

app.listen(5000, ()=>{
  console.log('Server is listening on port 5000...');
});