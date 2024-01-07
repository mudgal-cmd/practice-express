const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./public'));

app.get('/', (req, res)=>{
  
  // res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
  
  // res.sendFile('C:/Users/Nishant Mudgal/Desktop/GitHub repos/practice-express/navbar-app/index.html');
  
  res.sendFile('./index.html', {root: './navbar-app'}); 
  
  // when we provide the relative path, we need to specify the root as well. Notice that we have not included the folder name (navbar-app) in the path string

});

app.all('*', (req, res)=>{
  res.status(404).send('Error: Could not locate the requested resource');
});

app.listen(5000, ()=>{
  console.log('Server is listening on port 5000...');
});